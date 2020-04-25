import { HTTPCache, RESTDataSource } from "apollo-datasource-rest";
import {BaseCLTContract} from "./models";
import {CashFlowServiceConfiguration} from "../config";

export class CashFlowDataSource extends RESTDataSource {
  constructor(private readonly cashFlowServiceConfig: CashFlowServiceConfiguration) {
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
}