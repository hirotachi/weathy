import express from "express";
import {ApolloServer} from "apollo-server-express";

import typeDefs from "./schema";
import resolvers from "./resolvers/resolvers";


const server = new ApolloServer({
  typeDefs,
  resolvers
});
const app = express();
server.applyMiddleware({app});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening and graphql on ${server.graphqlPath}`);
});






