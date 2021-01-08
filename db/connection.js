//var mysql = require('mysql');
const { Sequelize } = require('sequelize');
const {HOST, DATABASE, USER, PASSWORD} = require('../config/app');

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
});





/* var con = mysql.createConnection({
  host: HOST,
  database: DATABASE,
  user: USER,
  password: PASSWORD,
  charset : 'utf8mb4'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
}); */

try {
  sequelize.authenticate();
   console.log('Connection has been established successfully.');

} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;