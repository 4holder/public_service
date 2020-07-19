import { HTTPCache, RESTDataSource } from "apollo-datasource-rest";
import {BaseCLTContract, FinancialContract, FinancialMovementsProjection, IncomeResume} from "./models";
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

  async getIncomeResumes(page: number, pageSize: number): Promise<IncomeResume[]> {
    return this.get(
      `/v1/listFinancialContracts`,
      {page, pageSize},
      {
        headers: this.getHeaders(),
      }
    ).then(incomeResumes => {
      return incomeResumes as IncomeResume[];
    })
  }

  async getIncomeProjections(page: number, pageSize: number): Promise<FinancialMovementsProjection[]> {
    return this.get(
      `/v1/getYearlyIncomeProjections`,
      {page, pageSize},
      {
        headers: this.getHeaders(),
      }
    ).then(projections => {
      return projections as FinancialMovementsProjection[];
    })
  }

  async registerNewFinancialContract(input: NewFinancialContractInput): Promise<FinancialContract> {
    return this.post(
      `/v1/registerNewFinancialContract`,
      JSON.stringify(input),
      {
        headers: this.getHeaders(),
      })
      .then(financialContract => financialContract as FinancialContract);
  }

  async removeFinancialContract(id: string): Promise<any> {
    return this.delete(
      `/v1/financialContract/${id}`,
      {},
      {
        headers: this.getHeaders(),
      }
    )
  }

  private getHeaders() {
    return {
      "content-type": "application/json",
      "Authorization": `Bearer ${this.token}`,
    };
  }
}