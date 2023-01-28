const common = require("@root/config/common");

console.log(process.env.PORT);
const PORT = process.env.PORT || 8000;

module.exports = {
  ...common,
  PORT,
};
