const common = require("@root/config/common");

const PORT = process.env.PORT || 8000;
console.log(PORT);

module.exports = {
  ...common,
  PORT,
};
