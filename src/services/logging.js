const dbConnection = require("../config/db");

class LoggingService {
  /**
   *  ADD LOG
   */
  async logAction(action, tableName, userId, recordId, conn) {
    try {
      const sql = `
        INSERT INTO logs (action, table_name, user_id, record_id)
        VALUES (?, ?, ?, ?)
      `;
      const values = [action, tableName, userId, recordId];

      await conn.execute(sql, values);
      console.log('Log inserted succesfully');
    } catch (error) {
      console.error('Error logging action:', error);
      throw new Error(error);
    }
  }

  async actionWithLogging(action, tableName, actionQuery, data, userId, recordId) {
    try {
      // begin transaction
      await dbConnection.beginTransaction();

      // query
      await dbConnection.query(actionQuery, data);

      // logging
      await LoggingService.logAction(action, tableName, userId, recordId, dbConnection);

      // commit transaction
      await dbConnection.commit();
    } catch(error) {
      throw new Error(error);
    }
  }
}

module.exports = LoggingService