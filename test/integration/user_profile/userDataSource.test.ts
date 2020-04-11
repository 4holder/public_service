import { expect } from "chai";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { UserDataSource } from "../../../src/user_profile/userDataSource";
import {clearUsers, dbClient, getUserByEmail, insertAleatoryUser} from "../../databaseTestHelper";
import { User } from "../../../src/user_profile/models";

describe("user_profile", () => {
  describe("User Data Source", () => {
    const userDataSource = new UserDataSource(dbClient);

    beforeEach(async () => {
      await clearUsers();
    });

    after(async () => {
      await clearUsers();
    });

    describe("Register New User", () => {
      it("should add a new user with provided information in database", async () => {
        const newUser = {
          id: uuidv4(),
          firstName: "An Awesome",
          lastName: "Last Name",
          email: "awesome@@email.com",
          username: "awesome.user",
          picture: "//beatiful.com/picutre.jpg",
          externalId: "google-oauth2|-90918938478278391828",
          cpf: 10000000000,
          birthDate: moment().subtract(20, 'year').toDate(),
          createdAt: moment().toDate(),
          modifiedAt: moment().toDate(),
        } as User;

        const result = await userDataSource.registerNewUser(newUser);

        expect(result.rowCount).to.be.equal(1);

        const storedUser = await getUserByEmail(newUser.email);

        expect(storedUser).to.be.deep.equal({
          id: newUser.id,
          first_name: newUser.firstName,
          last_name: newUser.lastName,
          email: newUser.email,
          username: newUser.username,
          picture: newUser.picture,
          cpf: newUser.cpf,
          birth_date: newUser.birthDate,
          external_id: newUser.externalId,
          created_at: newUser.createdAt,
          modified_at: newUser.modifiedAt,
        });
      })
    });

    describe("Get User by External Id", () => {
      it("should return null when there is no user in db", async () => {
        const fakeId = "does-not-exist";

        const user = await userDataSource.getUserUserByExternalId(fakeId);

        expect(user).to.be.null;
      });

      it("should return the right when there are more than one user in db", async () => {
        const userIWant = await insertAleatoryUser();
        await insertAleatoryUser();
        await insertAleatoryUser();

        const user = await userDataSource.getUserUserByExternalId(userIWant.external_id);

        const expectedUser = {
          ...userIWant,
          firstName: userIWant.first_name,
          lastName: userIWant.last_name,
          externalId: userIWant.external_id,
          birthDate: userIWant.birth_date,
          createdAt: userIWant.created_at,
          modifiedAt: userIWant.modified_at,
        } as User;

        expect(expectedUser).to.be.deep.equal(user);
      });
    });
  });
});