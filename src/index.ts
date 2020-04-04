import {typeDefs} from "./schema";
import { resolvers } from "./resolvers";
import {ApolloServer} from "apollo-server";
import config from "./config";


const startServer = async () => {
    const apolloConfig = {
        typeDefs,
        resolvers,
    };

    const apolloServer = new ApolloServer(apolloConfig);

    try {
        await apolloServer.listen(config.server);
        const serverUrl = `${config.server.protocol}://${config.server.host}:${config.server.port}/`;
        console.log(`Server running at: ${serverUrl}`);
    } catch (err) {
        process.exit(1);
    }
};

startServer();