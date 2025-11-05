const mysql= require("mysql2");
const util = require("util"); 

let dbConnection;

dbConnection = mysql.createPool({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DATABASE,
    charset: 'utf8mb4',
    connectionLimit:10,

    waitForConnections: true,
    queueLimit: 0,
    idleTimeout: 30000,
    enableKeepAlive: true
});

// Wrapper to use ASYNC / AWAIT on Mysql queries
dbConnection.query = util.promisify(dbConnection.query).bind(dbConnection);

// dbConnection.connect((err) => {
//   if(err){
//     console.log('Error connecting to Db');
//     return;
//   }
//   console.log('Connection established');
// });

module.exports = dbConnection;