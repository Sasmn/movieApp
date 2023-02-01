const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers/index");

//to remove the warning
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const app = express();

app.use(express.json());

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(expressMiddleware(server));
})();

module.exports = app;
