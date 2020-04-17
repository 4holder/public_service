import { Auth0Client } from "../infrastructure/auth0Client";
import { UserDataSource } from "./userDataSource";
import { User } from "./models";
import { v4 as uuidv4 } from 'uuid';

export async function importAuth0User(
  externalUserId: string,
  userDataSource: UserDataSource,
  auth0Client: Auth0Client,
  id: string = uuidv4()
): Promise<User> {
  const userInfo = await userDataSource.getUserUserByExternalId(externalUserId);

  if(userInfo) {
    return userInfo;
  }

  const auth0UserInfo = await auth0Client.getUserInfo(externalUserId);

  const user = {
    id,
    firstName: auth0UserInfo.given_name,
    lastName: auth0UserInfo.family_name,
    email: auth0UserInfo.email,
    username: auth0UserInfo.nickname,
    picture: auth0UserInfo.picture,
    externalId: externalUserId,
    createdAt: auth0UserInfo.created_at,
    modifiedAt: auth0UserInfo.updated_at,
  } as User;

  return userDataSource.registerNewUser(user).then(_ => user);
}