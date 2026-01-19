const path = require("path");
const dotenv = require("dotenv");

// Load .env from ROOT always
dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
};
