const Comment = require("../../models/Comment");
const User = require("../../models/User");
const { ApolloError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");

const resolvers = {
  Mutation: {
    createComment: async (
      root,
      { commentInput: { username, movieID, body } }
    ) => {
      //check if user is still logged in
      const user = await User.findOne({ username: username });

      try {
        jwt.verify(user.token, process.env.JWT_SECRET);
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          throw new ApolloError(
            `The user ${user.username} is not logged in`,
            "TOKEN_EXPIRES"
          );
        }
      }

      const date = new Date();
      console.log(date.getMonth(), date.getFullYear());
      console.log(date.getDate());
      //Build out the mongoose model
      const newComment = new Comment({
        username,
        movieID,
        body,
        date: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      });

      //Save comment in MongoDB
      const res = await newComment.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    deleteComment: async (root, { id, username }) => {
      //check if the user is the correct one
      const comment = await Comment.findById(id);
      if (comment.username !== username) {
        throw new ApolloError("Invalid username");
      }
      //check if user is still logged in
      const user = await User.findOne({ username: username });

      try {
        jwt.verify(user.token, process.env.JWT_SECRET);
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          throw new ApolloError(
            `The user ${user.username} is not logged in`,
            "TOKEN_EXPIRES"
          );
        }
      }

      return Comment.findByIdAndDelete(id);
    },
    editComment: async (root, { id, body, username }) => {
      //check if the user is the correct one
      const comment = await Comment.findById(id);
      if (comment.username !== username) {
        throw new ApolloError("Invalid username");
      }

      //check if user is still logged in
      const user = await User.findOne({ username: username });

      try {
        jwt.verify(user.token, process.env.JWT_SECRET);
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          throw new ApolloError(
            `The user ${user.username} is not logged in`,
            "TOKEN_EXPIRES"
          );
        }
      }

      return Comment.findByIdAndUpdate(id, { body }, { new: true });
    },
  },
  Query: {
    getAllCommentsByUsername: async (root, { username }) =>
      Comment.find({ username: username }),
    getAllCommentsByMovieID: async (root, { movieID }) =>
      Comment.find({ movieID: movieID }),
  },
};

module.exports = resolvers;
