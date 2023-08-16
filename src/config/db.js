const mysql= require("mysql2");
const util = require("util"); 

let dbConnection;

dbConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DATABASE,
    connectionLimit:10
});

// Wrapper to use ASYNC / AWAIT on Mysql queries
dbConnection.query = util.promisify(dbConnection.query).bind(dbConnection);

dbConnection.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

module.exports = dbConnection;