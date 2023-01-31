const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");

const resolvers = {
  Mutation: {
    createUser: async (
      root,
      { registerInput: { username, email, password, confirmPassword } }
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

      //see if passwords match
      if (password !== confirmPassword) {
        throw new ApolloError(
          `Passwords don't match!`,
          "PASSWORDS_DONT_MATCH"
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
    loginUser: async (root, { loginInput: { username, password } }) => {
      // see if username exists
      const user = await User.findOne({ username });

      // check if password is correct
      if (user && (await bcrypt.compare(password, user.password))) {
        // create new jwt token
        const token = jwt.sign(
          {
            user_id: user._id,
            username,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        user.token = token;

        //Save new user state (token) in MongoDB
        const res = await user.save();

        return {
          id: res.id,
          ...res._doc,
        };
      } else {
        //if user doesnt exists or password is incorrect, throw error
        throw new ApolloError(
          "Incorrect password or username",
          "INCORRECT_PASSWORD/USERNAME"
        );
      }
    },
  },
  Query: {
    getUserById: async (root, { ID }) => User.findOne(ID),
    getUserByName: async (root, username) => User.findOne(username),
    getAllUser: async () => User.find(),
  },
};

module.exports = resolvers;
