import { ApolloError } from "apollo-server";
import { AppContext } from "../infrastructure/models";
import { AuthenticationError } from "../infrastructure/AuthenticationError";
import { NewFinancialContractInput } from "./payloads";

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

export const getIncomeResumesResolver = async (
  _: any,
  { page, pageSize }: {page: number, pageSize: number},
  { tokenData, cashFlowDataSource }: AppContext,
) => {
  return tokenData
    .then( (_) => {
      return cashFlowDataSource.getIncomeResumes(page, pageSize);
    }).catch(e => {
      if(e instanceof AuthenticationError) {
        throw new ApolloError(e.message, "INVALID_TOKEN");
      }

      throw e;
    });
};

export const getIncomeProjectionsResolver = async (
  _: any,
  { page, pageSize }: {page: number, pageSize: number},
  { tokenData, cashFlowDataSource }: AppContext,
) => {
  return tokenData
    .then( (_) => {
      return cashFlowDataSource.getIncomeProjections(page, pageSize);
    }).catch(e => {
      if(e instanceof AuthenticationError) {
        throw new ApolloError(e.message, "INVALID_TOKEN");
      }

      throw e;
    });
};

export const getFinancialContractDetailsResolver = async (
  _: any,
  { id }: {id: string},
  { tokenData, cashFlowDataSource }: AppContext,
) => {
  return tokenData
    .then( (_) => {
      return cashFlowDataSource.getFinancialContractDetails(id);
    }).catch(e => {
      if(e instanceof AuthenticationError) {
        throw new ApolloError(e.message, "INVALID_TOKEN");
      }

      throw e;
    });
};

export const registerNewFinancialContractResolver = async (
  _: any,
  { input }: { input: NewFinancialContractInput },
  { tokenData, cashFlowDataSource }: AppContext,
) => {
  return tokenData
    .then( async (_) => {
      const financialContract = await cashFlowDataSource.registerNewFinancialContract(input);
      return financialContract;
    }).catch(e => {
      if(e instanceof AuthenticationError) {
        throw new ApolloError(e.message, "INVALID_TOKEN");
      }

      throw e;
    });
};

export const removeFinancialContractResolver = async (
  _: any,
  { id }: { id: string },
  { tokenData, cashFlowDataSource }: AppContext,
) => {
  return tokenData
    .then( (_) =>
      cashFlowDataSource
        .removeFinancialContract(id)
        .then(_ => ({ success: true, message: "Contract was removed." }))
    ).catch(e => {
      if(e instanceof AuthenticationError) {
        throw new ApolloError(e.message, "INVALID_TOKEN");
      }

      throw e;
    });
};
