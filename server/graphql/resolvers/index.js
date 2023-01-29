const userResolvers = require("./users");
const apiResolvers = require("./apis");
const commentResolvers = require("./comments");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...apiResolvers.Query,
    ...commentResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
