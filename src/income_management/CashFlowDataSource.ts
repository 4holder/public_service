import { HTTPCache, RESTDataSource } from "apollo-datasource-rest";
import {BaseCLTContract, FinancialContract} from "./models";
import { CashFlowServiceConfiguration } from "../config";
import {NewFinancialContractInput} from "./payloads";

export class CashFlowDataSource extends RESTDataSource {
  constructor(private readonly cashFlowServiceConfig: CashFlowServiceConfiguration,
              private readonly token: string) {
    super();

    this.baseURL = cashFlowServiceConfig.url;
    this.httpCache = new HTTPCache()
  }

  async calculateBaseCLTContract(
    grossSalaryInCents: number,
    dependentsQuantity: number,
    deductionsInCents: number
  ): Promise<BaseCLTContract> {
    const body = {
      "grossSalary": grossSalaryInCents,
      "dependentQuantities": dependentsQuantity,
      "deductionsAmount": deductionsInCents,
    };

    return this.post(
      `/v1/calculateCLTContract`,
      body,
      {
        headers: {
          "content-type": "application/json",
        },
      }).then(baseCLTContract => {
        return baseCLTContract as BaseCLTContract
    });
  }

  async getFinancialContracts(page: number, pageSize: number): Promise<FinancialContract[]> {
    return this.get(
      `/v1/financial_contracts`,
      {page, pageSize},
      {
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${this.token}`,
        }
      }
    ).then(contracts => {
      return contracts as FinancialContract[];
    })
  }

  async registerNewFinancialContract(input: NewFinancialContractInput): Promise<FinancialContract> {
    return this.post(
      `/v1/financial_contracts`,
      JSON.stringify(input),
      {
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${this.token}`,
        },
      })
      .then(financialContract => financialContract as FinancialContract);
  }
}