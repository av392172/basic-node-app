require("dotenv").config();
const { argv } = require("yargs");
module.exports = {
  PORT_NUMBER: argv.port || 3000,
};
