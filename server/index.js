import express from "express";
import {ApolloServer} from "apollo-server-express";
import path from "path";
import cors from "cors";

import typeDefs from "./schema";
import resolvers from "./resolvers/resolvers";

const publicPath = path.join(__dirname, "..", "public");
const server = new ApolloServer({
  typeDefs,
  resolvers
});
const app = express();
app.use(express.static(publicPath));
app.use(cors());
server.applyMiddleware({app});

const port = process.env.PORT || 3000;

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"))
});
app.listen(port, () => {
  console.log(`Server listening and graphql on ${server.graphqlPath}`);
});







