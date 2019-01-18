const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const http = require("http");
const https = require("https");
const path = require("path");
const cors = require("cors");

const typeDefs = require("./schema");
const resolvers = require("./resolvers/resolvers");

const publicPath = path.join(__dirname, "..", "public");
const server = new ApolloServer({
  typeDefs,
  resolvers
});
const app = express();
app.use(cors());
app.use(express.static(publicPath));
server.applyMiddleware({app});

const port = process.env.PORT || 3000;

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"))
});

app.listen(port, () => {
  console.log(`Server listening and graphql on ${server.graphqlPath}`);
});











