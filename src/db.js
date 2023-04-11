const { createConnection } = require("mysql");


const dbConnection = createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'gamescollection',
    connectionLimit:10
});

dbConnection.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

module.exports = dbConnection;