"use strict";

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _schema = _interopRequireDefault(require("./schema"));

var _resolvers = _interopRequireDefault(require("./resolvers/resolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var publicPath = _path.default.join(__dirname, "..", "public");

var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema.default,
  resolvers: _resolvers.default
});
var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.static(publicPath));
server.applyMiddleware({
  app: app
});
var port = process.env.PORT || 3000;
app.get("*", function (req, res) {
  res.sendFile(_path.default.join(publicPath, "index.html"));
});
app.listen(port, function () {
  console.log("Server listening and graphql on ".concat(server.graphqlPath));
});
