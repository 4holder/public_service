import * as userSchema from './user_profile/schema';

export const typeDefs = `
  type Query { 
    ${userSchema.queries}
  }
  
  type Mutation {
    ${userSchema.mutations}
  }
  
  scalar Date
  
  ${userSchema.types}
`;