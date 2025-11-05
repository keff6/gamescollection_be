const mysql = require("mysql2/promise");

const dbConnectionPool = mysql.createPool({
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

dbConnectionPool.on('error', err => {
  console.error('MySQL Pool Error:', err);
});

module.exports = dbConnectionPool;