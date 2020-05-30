import {Amount, ContractType} from "./models";

export interface NewFinancialContractInput {
  name: string;
  contractType: ContractType;
  grossAmount: Amount;
  companyCnpj?: string;
  startDate: Date;
  endDate?: Date;
}