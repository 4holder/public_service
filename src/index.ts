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

    const dbPool = new Pool(config.database);

    const apolloServer = new ApolloServer(apolloConfig);

    try {
        await apolloServer.listen(config.server);
        const serverUrl = `${config.server.protocol}://${config.server.host}:${config.server.port}/`;

        dbPool.query("SELECT 'DBD::Pg ping test'").then(_ =>
            console.log(`
                Properly connected to the database 
                ${config.database.host}:${config.database.port}/${config.database.database}.`)
        );

        console.log(`Server running at: ${serverUrl}`);
    } catch (err) {
        process.exit(1);
    }
};

startServer();