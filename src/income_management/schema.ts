export const queries = `
baseCLTContract(grossSalaryInCents: Int!, dependentsQuantity: Int!, deductionsInCents: Int!): BaseCLTContract
`;

export const mutations = ``;

export const types = `
enum Currency {
  BRL
}

type Money {
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
  amount: Money
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
  amount: Money
  grossAmountAliquot: Float
  occurrences: Occurrences
  createdAt: Date
  modifiedAt: Date
}

type BaseCLTContract {
  grossSalary: Money
  incomes: [Income]
}
`;