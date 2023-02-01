const { model, Schema } = require("mongoose");

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  movieID: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
    maxLength: 140,
  },
});

module.exports = model("Comment", schema);
