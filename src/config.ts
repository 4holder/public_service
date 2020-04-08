const { env } = process;

interface IConfiguration {
  server: {
    protocol: string;
    host: string;
    port: number;
  };
  database: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
    max: number;
  };
}

const server = {
  protocol: "http",
  host: "0.0.0.0",
  port: 3000,
};

const database = {
  host: env.DATABASE_HOST || "localhost",
  port: env.DATABASE_PORT || 5432,
  database: env.DATABASE_NAME || "postgres",
  user: env.DATABASE_USER || "postgres",
  password: env.DATABASE_PASSWORD || "postgres",
  max: 5,
};

export default {
  server,
  database,
} as IConfiguration;