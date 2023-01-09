const common = require("@root/config/common");

const PORT = process.env.PORT || 8000;
console.log(process.env.PORT);

module.exports = {
  ...common,
  PORT,
};
