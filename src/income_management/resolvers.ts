import { ApolloError } from "apollo-server";
import { AppContext } from "../infrastructure/models";
import { AuthenticationError } from "../infrastructure/AuthenticationError";

interface BaseCLTContractInput {
 grossSalaryInCents: number;
 dependentsQuantity: number;
 deductionsInCents: number;
}

export const baseCLTContractResolver = async (
  _: any,
  {
    grossSalaryInCents,
    dependentsQuantity,
    deductionsInCents,
  }: BaseCLTContractInput,
  { tokenData, cashFlowDataSource }: AppContext,
) => {
  return tokenData
    .then( (_) => {
      return cashFlowDataSource.calculateBaseCLTContract(grossSalaryInCents, dependentsQuantity, deductionsInCents);
    }).catch(e => {
      if(e instanceof AuthenticationError) {
        throw new ApolloError(e.message, "INVALID_TOKEN");
      }

      throw e;
    });
};
