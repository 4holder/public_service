import { Auth0Client } from "../infrastructure/auth0Client";
import { Auth0User } from "./models";

export async function retrieveAuth0UserProfile(
  externalUserId: string,
  auth0Client: Auth0Client
): Promise<Auth0User> {
  const userInfo = await auth0Client.getUserInfo(externalUserId);

  return {
    id: userInfo.user_id,
    givenName: userInfo.given_name,
    familyName: userInfo.family_name,
    email: userInfo.email,
    nickname: userInfo.nickname,
    picture: userInfo.picture,
  } as Auth0User;
}