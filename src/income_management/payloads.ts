import {Amount, ContractType, DiscountType, IncomeType, Occurrences} from "./models";

export interface NewIncomeDiscountInput {
  name: string;
  amount: Amount;
  discountType: DiscountType;
}

export interface NewIncomeInput {
  name: string;
  amount: Amount;
  incomeType: IncomeType;
  occurrences: Occurrences;
  discounts: NewIncomeDiscountInput[];
}

export interface NewFinancialContractInput {
  name: string;
  contractType: ContractType;
  companyCnpj?: string;
  startDate: Date;
  endDate?: Date;
  incomes: NewIncomeInput[];
}