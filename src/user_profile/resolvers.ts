import { AppContext } from "../infrastructure/models";
import { importAuth0User } from "./importAuth0User";
import { ApolloError } from "apollo-server";
import { AuthenticationError } from "../infrastructure/AuthenticationError";

export const userProfileResolver = async (
  _: any,
  __: any,
  { userDataSource, tokenData }: AppContext,
) => {
  return tokenData
    .then(async (token) => {
      return await userDataSource.getUserUserByExternalId(token.sub)
    }).catch(e => {
      if(e instanceof AuthenticationError) {
        throw new ApolloError(e.message, "INVALID_TOKEN");
      }

      throw e;
    });
};

export const importAuth0UserResolver = async (
  _: any,
  __: any,
  { auth0Client, userDataSource, tokenData }: AppContext,
) => {
  const token = await tokenData;

  return importAuth0User(token.sub, userDataSource, auth0Client);
};