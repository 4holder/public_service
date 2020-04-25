import * as userSchema from './user_profile/schema';
import * as incomeManagement from './income_management/schema';

export const typeDefs = `
  type Query { 
    ${userSchema.queries}
    ${incomeManagement.queries}
  }
  
  type Mutation {
    ${userSchema.mutations}
    ${incomeManagement.mutations}
  }
  
  scalar Date
  
  ${userSchema.types}
  ${incomeManagement.types}
`;