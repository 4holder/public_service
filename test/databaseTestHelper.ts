import {Pool} from "pg";
import { IDatabaseConfig } from "../src/config";
import { UserDatabaseRow } from "../src/user_profile/userDataSource";
import { v4 as uuidv4 } from "uuid";
import moment = require("moment-timezone");

const { env } = process;

const testDatabaseConfig = {
  user: "postgres",
  host: env.TEST_DB_HOST || "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
  max: 10,
  connectionTimeoutMillis: 5000,
} as IDatabaseConfig;

export const dbClient = new Pool(testDatabaseConfig);

export const getUserByEmail = async (email: String) => {
  return dbClient.query<UserDatabaseRow>(
    `SELECT * FROM public.users WHERE email=$1;`,
    [email]
  ).then(result => {
    const row = result.rows[0];
    return {
      ...row,
    } as UserDatabaseRow;
  });
};

export const insertAleatoryUser = async () => {
  const user = {
    id: uuidv4(),
    first_name: uuidv4().replace('-', ' ').toUpperCase(),
    last_name: uuidv4().replace('-', ' ').toLocaleLowerCase(),
    username: uuidv4().replace("-", ''),
    email: `${uuidv4()}@@email.com`,
    created_at: moment().toDate(),
    modified_at: moment().toDate(),
    picture: "//pic.jpg",
    external_id: uuidv4(),
  } as UserDatabaseRow;

  return dbClient.query(
    `INSERT INTO public.users
            (id, first_name, last_name, username, email,
             created_at, modified_at, picture, external_id)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
    [
      user.id,
      user.first_name,
      user.last_name,
      user.username,
      user.email,
      user.created_at,
      user.modified_at,
      user.picture,
      user.external_id,
    ]
  ).then(_ => user);
};

export const clearUsers = async () => {
  await dbClient.query({
    text: "TRUNCATE public.users CASCADE",
  });
};