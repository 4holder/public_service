import chai, { expect } from "chai";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { UserDataSource } from "../../../src/user_profile/userDataSource";
import { User } from "../../../src/user_profile/models";
import sinonChai from "sinon-chai";
import sinon, { stub } from "sinon";
import { Auth0Client, Auth0UserInfo } from "../../../src/infrastructure/auth0Client";
import { Auth0Configuration } from "../../../src/config";
import { Pool, QueryResult } from "pg";
import { importAuth0User } from "../../../src/user_profile/importAuth0User";

chai.use(sinonChai);

describe("user_profile", () => {
  describe("Sign Up", () => {
    const auth0Config = {
      domain: "4holder.test.com",
      clientId: "an-id",
      clientSecret: "an-secret",
    } as Auth0Configuration;
    const auth0Client = new Auth0Client(auth0Config);
    const fakePool = {} as Pool;
    const userDataSource = new UserDataSource(fakePool);

    const tokenSub = `google-oauth|${uuidv4()}`;
    const expectedAuth0Response = {
      user_id: tokenSub,
      given_name: "Some Awesome",
      family_name: "Family Name",
      name: "Some Awesome Family Name",
      nickname: "someoneawesome",
      email: "someone@@test.com",
      picture: "//pic.test.com/image.jpg",
      created_at: moment().toDate(),
      updated_at: moment().toDate(),
    } as Auth0UserInfo;

    afterEach(() => {
      sinon.reset();
      sinon.restore();
    });

    it("should properly store user info when auth0 return user data", async () => {
      stub(auth0Client, "getUserInfo").resolves(expectedAuth0Response);
      const fakeQueryResult = {} as QueryResult;
      stub(userDataSource, "registerNewUser").resolves(fakeQueryResult);

      const expectedUserId = uuidv4();

      const expectedUserData = {
        id: expectedUserId,
        firstName: expectedAuth0Response.given_name,
        lastName: expectedAuth0Response.family_name,
        email: expectedAuth0Response.email,
        username: expectedAuth0Response.nickname,
        externalId: tokenSub,
        picture: expectedAuth0Response.picture,
        createdAt: expectedAuth0Response.created_at,
        modifiedAt: expectedAuth0Response.updated_at,
      } as User;

      await importAuth0User(tokenSub, userDataSource, auth0Client, expectedUserId);

      expect(auth0Client.getUserInfo).to.be.calledWith(tokenSub);
      expect(userDataSource.registerNewUser).to.be.calledWith(expectedUserData);
    });
  });
});
