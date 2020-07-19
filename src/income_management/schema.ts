export const queries = `
baseCLTContract(grossSalaryInCents: Int!, dependentsQuantity: Int!, deductionsInCents: Int!): BaseCLTContract
getIncomeResumes(page: Int!, pageSize: Int!): [IncomeResume]!
getIncomeProjections(page: Int!, pageSize: Int!): [FinancialMovementsProjection]!
`;

export const mutations = `
registerNewFinancialContract(input: NewFinancialContractInput): FinancialContract!
removeFinancialContract(id: String!): RemoveContractResponse
`;

export const types = `
enum Currency {
  BRL
  USD
}

type Amount {
  valueInCents: Int
  currency: Currency
}

type Occurrences {
  day: Int
  months: [Int]
}

enum IncomeType {
  SALARY
  THIRTEENTH_SALARY
  THIRTEENTH_SALARY_ADVANCE
  PROFIT_SHARING
}

type Income {
  id: String
  name: String
  amount: Amount
  incomeType: IncomeType
  occurrences: Occurrences
  discounts: [Discount]
  createdAt: Date
  modifiedAt: Date
}

enum DiscountType {
  SYNDICATE
  IRRF
  INSS
  HEALTH_CARE
  MEALS
  PARKING
  OTHER
}

type Discount {
  id: String
  name: String
  discountType: DiscountType
  amount: Amount
  createdAt: Date
  modifiedAt: Date
}

type BaseCLTContract {
  grossSalary: Amount
  incomes: [Income]
}

enum ContractType {
  CLT
}

type FinancialContract {
  id: String
  name: String
  contractType: ContractType
  companyCnpj: String
  startDate: Date
  endDate: Date
  incomes: [Income]
  createdAt: Date
  modifiedAt: Date
}

type IncomeResume {
  id: String!
  name: String
  yearlyGrossIncome: Amount
  yearlyNetIncome: Amount
  yearlyIncomeDiscount: Amount
}

type ProjectionPoint {
  amount: Amount
  dateTime: Date
}

type FinancialMovementsProjection {
  label: String
  currency: String
  financialMovements: [ProjectionPoint]
}

input OccurrencesInput {
  day: Int
  months: [Int]
}

input AmountInput {
  valueInCents: Int
  currency: Currency
}

input NewIncomeDiscountInput {
  name: String
  discountType: DiscountType
  amount: AmountInput
}

input NewIncomeInput {
  name: String
  amount: AmountInput
  incomeType: IncomeType
  occurrences: OccurrencesInput
  discounts: [NewIncomeDiscountInput]
}

input NewFinancialContractInput {
  name: String!
  contractType: ContractType!
  companyCnpj: String
  startDate: Date!
  endDate: Date
  incomes: [NewIncomeInput]
}

type RemoveContractResponse {
  success: Boolean
  message: String
}
`;