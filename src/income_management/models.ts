import { Dinero as IDinero } from "dinero.js";


export enum ContractType {
  CLT = "CLT",
  Other = "OTHER",
}

export interface FinancialContract {
  id: string;
  name: string;
  contractType: ContractType;
  companyCnpj: string;
  incomes: Income[],
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  modifiedAt: Date;
}

export interface Occurrences {
  day: number;
  months: number[];
}

export enum IncomeType {
  Salary = "SALARY",
  ThirteenthSalary = "THIRTEENTH_SALARY",
  ThirteenthSalaryAdvance = "THIRTEENTH_SALARY_ADVANCE",
  ProfitSharing = "PROFIT_SHARING",
}

export interface Income {
  id: string;
  name: string;
  amount: IDinero;
  incomeType: IncomeType;
  occurrences: Occurrences;
  discounts: Discount[];
  createdAt: Date;
  modifiedAt: Date;
}

export enum DiscountType {
  Syndicate = "SYNDICATE",
  IRRF = "IRRF",
  INSS = "INSS",
  HealthCare = "HEALTH_CARE",
  Meals = "MEALS",
  Parking = "PARKING",
  Other = "OTHER",
}

export interface Discount {
  id: string;
  incomeId: string;
  name: string;
  discountType: DiscountType;
  amount: IDinero;
  percentage: number;
  occurrences: Occurrences;
  createdAt: Date;
  modifiedAt: Date;
}

export interface BaseCLTContract {
  grossSalary: IDinero;
  incomes: Income[];
}
