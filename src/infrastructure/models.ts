import { Auth0Client } from "./auth0Client";
import { UserDataSource } from "../user_profile/userDataSource";

export interface UserToken {
  email: string;
  email_verified: boolean;
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  at_hash: string;
  nonce: string;
}

export interface AppContext {
  tokenData: Promise<UserToken>;
  token: string;
  userDataSource: UserDataSource;
  auth0Client: Auth0Client;
}