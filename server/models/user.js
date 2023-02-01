const { model, Schema } = require("mongoose");

const schema = new Schema({
  username: {
    type: String,
    required: true,
    default: 0,
    unique: true,
  },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = model("User", schema);

//AHOGY A MONGODB-N TÁROLVA LESZNEK
