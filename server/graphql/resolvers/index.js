const userResolvers = require("./users");
const apiResolvers = require("./apis");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...apiResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};
