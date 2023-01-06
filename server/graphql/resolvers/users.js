require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");

const resolvers = {
  Mutation: {
    createUser: async (
      root,
      { registerInput: { username, email, password } }
    ) => {
      //See if old user exists with username
      const takenUsername = await User.findOne({ username });

      if (takenUsername) {
        throw new ApolloError(
          `The username: ${username} is already taken`,
          "USER_ALREADY_EXISTS"
        );
      }

      //See if old user exists with email
      const takenEmail = await User.findOne({ email });

      if (takenEmail) {
        throw new ApolloError(
          `A user is already registered with email: ${email}`,
          "USER_ALREADY_EXISTS"
        );
      }

      //Encrypt password
      var encryptedPassword = await bcrypt.hash(password, 10);

      //Build out the mongoose model
      const newUser = new User({
        username,
        email,
        password: encryptedPassword,
      });

      //Create the jwt token
      const token = jwt.sign(
        {
          user_id: newUser._id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      //Attach it to the mongoose model
      newUser.token = token;

      //Save user in MongoDB
      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
  Query: {
    getUserById: async (root, { ID }) => User.findOne(ID),
    getUserByName: async (root, username) => User.findOne(username),
    getAllUser: async () => User.find(),
  },
};

module.exports = resolvers;
