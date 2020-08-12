
export interface Amount {
  valueInCents: number;
  currency: string;
}

export enum ContractType {
  CLT = "CLT",
  Other = "OTHER",
}

export interface User {
  id: string
}

export interface FinancialContract {
  id: string;
  user: User;
  name: string;
  contractType: ContractType;
  companyCnpj?: string;
  grossAmount: Amount;
  incomes: Income[];
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  modifiedAt: Date;
}

export interface IncomeResume {
  id: string;
  name: string;
  yearlyGrossIncome?: Amount;
  yearlyNetIncome?: Amount;
  yearlyIncomeDiscount?: Amount;
}

export interface ProjectionPoint {
  amount: Amount;
  dateTime: Date;
}

export interface FinancialMovementsProjection {
  label: string;
  currency: string;
  financialMovements: ProjectionPoint[];
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
  OTHER = "OTHER",
}

export interface Income {
  id: string;
  name: string;
  amount: Amount;
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
  name: string;
  discountType: DiscountType;
  amount: Amount;
  createdAt: Date;
  modifiedAt: Date;
}

export interface BaseCLTContract {
  grossSalary: Amount;
  incomes: Income[];
}

export interface DetailedIncomeDiscount {
  id: string;
  name: string;
  discountType: string;
  amount: Amount;
  createdAt: Date
  modifiedAt: Date
}

export interface DetailedIncome {
  id: string;
  name: string;
  grossAmount: Amount;
  netAmount: Amount;
  incomeType: string;
  occurrences: Occurrences;
  discounts: DetailedIncomeDiscount[];
  createdAt: Date;
  modifiedAt: Date;
}

export interface DetailedFinancialContract {
  id: string;
  name: string;
  contractType: string;
  companyCnpj: string;
  incomes: DetailedIncome[];
  totalYearlyGrossAmount: Amount;
  totalYearlyNetAmount: Amount;
  totalYearlyDiscountAmount: Amount;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  modifiedAt: Date;
}
