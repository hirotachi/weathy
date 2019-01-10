import express from "express";
import {ApolloServer} from "apollo-server-express";
import cors from "cors";

import typeDefs from "./schema";
import resolvers from "./resolvers/resolvers";


const server = new ApolloServer({
  typeDefs,
  resolvers
});
const app = express();
app.use(cors());
server.applyMiddleware({app});

const port = process.env.PORT || 3000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
});
app.listen(port, () => {
  console.log(`Server listening and graphql on ${server.graphqlPath}`);
});






