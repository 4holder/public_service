import {Auth0Client} from "../infrastructure/auth0Client";
import { UserDataSource } from "./userDataSource";
import {User} from "./models";
import { v4 as uuidv4 } from 'uuid';

export interface SignupInput {
  cpf: string;
  birthDate: Date;
  username: string;
}

export async function signup(
  externalUserId: string,
  input: SignupInput,
  userDataSource: UserDataSource,
  auth0Client: Auth0Client,
  id: string = uuidv4()
): Promise<User> {
  const userInfo = await auth0Client.getUserInfo(externalUserId);

  const user = {
    id,
    firstName: userInfo.given_name,
    lastName: userInfo.family_name,
    email: userInfo.email,
    username: input.username,
    cpf: parseInt(input.cpf),
    birthDate: input.birthDate,
    picture: userInfo.picture,
    externalId: externalUserId,
    createdAt: userInfo.created_at,
    modifiedAt: userInfo.updated_at,
  } as User;

  return userDataSource.registerNewUser(user).then(_ => user);
}