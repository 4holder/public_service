import {typeDefs} from "./schema";
import { resolvers } from "./resolvers";
import {ApolloServer} from "apollo-server";
import config from "./config";
import { Pool } from "pg";

const startServer = async () => {
    const apolloConfig = {
        typeDefs,
        resolvers,
    };

    const { database } = config;

    const dbPool = new Pool(database);

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