import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server";
import config from "./config";
import { Pool } from "pg";
import { Auth0Client } from "./infrastructure/auth0Client";
import { AppContext } from "./infrastructure/models";
import { UserDataSource } from "./user_profile/userDataSource";
import { authenticate } from "./infrastructure/auth";

const startServer = async () => {
    const { database, auth0Configuration } = config;

    const dbPool = new Pool(database);
    const auth0Client = new Auth0Client(auth0Configuration);
    const userDataSource = new UserDataSource(dbPool);

    const apolloConfig = {
        typeDefs,
        resolvers,
        context: ({ req }: any) => {
            const bearer = req.headers.authorization || "";
            const token = bearer.replace("Bearer ", "");
            req.headers.Authorization = bearer;

            return {
                tokenData: authenticate(token, config.tokenConfig),
                userDataSource,
                auth0Client,
            } as AppContext;
        },
    };

    const apolloServer = new ApolloServer(apolloConfig);

    try {
        await apolloServer.listen(config.server);
        const serverUrl = `${config.server.protocol}://${config.server.host}:${config.server.port}/`;

        const databaseAddress = `postgresql://${database.user}@${database.host}:${database.port}/${database.database}`;

        dbPool.query("SELECT 'DBD::Pg ping test'").then(_ =>
            console.log(`Properly connected to the database ${databaseAddress}.`)
        ).catch(e => {
            console.log(`Database connection error: ${e} - ${e.message}`);
        });

        console.log(`Database is: ${databaseAddress}`);
        console.log(`Server running at: ${serverUrl}`);
    } catch (err) {
        process.exit(1);
    }
};

startServer();