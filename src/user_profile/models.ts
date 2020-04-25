export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  picture: string;
  externalId: string;
  cpf?: number;
  birthDate?: Date;
  createdAt: Date;
  modifiedAt: Date;
}
