// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DATABASE: process.env.DATABASE,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.PASSWORD
};