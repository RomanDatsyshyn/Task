require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let ADMIN_NAME = process.env.ADMIN_NAME;
let ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

module.exports = {
  MONGODB_URI,
  PORT,
  ADMIN_NAME,
  ADMIN_PASSWORD
};
