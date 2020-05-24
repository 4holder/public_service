export const queries = `
baseCLTContract(grossSalaryInCents: Int!, dependentsQuantity: Int!, deductionsInCents: Int!): BaseCLTContract
getFinancialContracts(page: Int!, pageSize: Int!): [FinancialContract]!
`;

export const mutations = `
registerNewFinancialContract(input: NewFinancialContractInput): FinancialContract!
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
  incomeId: String
  name: String
  discountType: DiscountType
  amount: Amount
  grossAmountAliquot: Float
  occurrences: Occurrences
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
  grossAmount: Amount
  startDate: Date
  endDate: Date
  createdAt: Date
  modifiedAt: Date
}

input AmountInput {
  valueInCents: Int
  currency: Currency
}

input NewFinancialContractInput {
  name: String!
  contractType: ContractType!
  grossAmount: AmountInput!
  companyCnpj: String
  startDate: Date!
  endDate: Date
}
`;