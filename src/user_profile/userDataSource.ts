import { DataSource } from "apollo-datasource";
import { Pool, QueryResult } from "pg";
import { User } from "./models";

export interface UserDatabaseRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  picture: string;
  locale: string;
  external_id: string;
  birth_date: Date;
  cpf: number;
  created_at: Date;
  modified_at: Date;
}

export class UserDataSource extends DataSource {
  constructor(private readonly dbClient: Pool) {
    super();
  }

  async getUserUserByExternalId(externalId: string): Promise<User> {
    return this.dbClient.query<UserDatabaseRow>(
      `SELECT * FROM public.users WHERE external_id = $1;`,
      [externalId]
    ).then(result => {
      if(result.rowCount == 0) {
        return null;
      }

      const row = result.rows[0];

      return {
        ...row,
        cpf: parseInt(row.cpf.toString()),
        firstName: row.first_name,
        lastName: row.last_name,
        birthDate: row.birth_date,
        createdAt: row.created_at,
        modifiedAt: row.modified_at,
        externalId: row.external_id
      } as User;
    });
  }

  async registerNewUser(user: User): Promise<QueryResult> {
    return this.dbClient.query(
      `INSERT INTO public.users
            (id, first_name, last_name, username, email, cpf,
             birth_date, created_at, modified_at, picture, external_id)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
      [
        user.id,
        user.firstName,
        user.lastName,
        user.username,
        user.email,
        user.cpf,
        user.birthDate,
        user.createdAt,
        user.modifiedAt,
        user.picture,
        user.externalId,
      ]
    );
  }
}