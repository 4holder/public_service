import { Auth0Client } from "./auth0Client";
import { UserDataSource } from "../user_profile/userDataSource";
import {CashFlowDataSource} from "../income_management/CashFlowDataSource";

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
  cashFlowDataSource: CashFlowDataSource;
  auth0Client: Auth0Client;
}