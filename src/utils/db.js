const mysql= require("mysql");
const util = require("util"); 

let dbConnection;

dbConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'gamescollection',
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