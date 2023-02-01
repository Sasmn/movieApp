const common = require("@root/config/common");

console.log(process.env.PORT);
const PORT = process.env.PORT || 5000;

module.exports = {
  ...common,
  PORT,
};
