export const queries = `
userProfile: User!
userAuth0Profile: Auth0User!
`;

export const mutations = `
signupUser(input: SingUpInput!): User!
`;

export const types = `
type User {
  id: String
  firstName: String
  lastName: String
  email: String
  cpf: String
  birthData: Date
  username: String
  picture: String
  externalId: String
  createdAt: Date
  modifiedAt: Date
}

type Auth0User {
  id: String
  givenName: String
  familyName: String
  email: String
  nickname: String
  picture: String
}

input SingUpInput {
  cpf: String
  birthData: Date!
  username: String!
}
`;