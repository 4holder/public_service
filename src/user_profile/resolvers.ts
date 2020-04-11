import { AppContext } from "../infrastructure/models";
import {retrieveAuth0UserProfile} from "./retrieveAuth0UserProfile";
import {signup, SignupInput} from "./signup";

export const userProfile = async (
  _: any,
  __: any,
  { userDataSource, tokenData }: AppContext,
) => {
  const token = await tokenData;

  return userDataSource.getUserUserByExternalId(token.sub);
};

export const userAuth0Profile = async (
  _: any,
  __: any,
  { auth0Client, tokenData }: AppContext,
) => {
  const token = await tokenData;

  return retrieveAuth0UserProfile(token.sub, auth0Client);
};

export const signupUser = async (
  _: any,
  { input }: { input: SignupInput },
  { auth0Client, userDataSource, tokenData }: AppContext,
) => {
  const token = await tokenData;

  return signup(token.sub, input, userDataSource, auth0Client);
};