export const queries = `
userProfile: User
`;

export const mutations = `
importAuth0User: User!
`;

export const types = `
type User {
  id: String
  firstName: String
  lastName: String
  email: String
  username: String
  picture: String
  externalId: String
  createdAt: Date
  modifiedAt: Date
}
`;