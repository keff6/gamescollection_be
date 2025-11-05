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

    // Create a dedicated connection from the Pool
    const connection = await dbConnection.getConnection();

    try {
      // begin transaction
      await connection.beginTransaction();

      // query
      await connection.query(actionQuery, data);

      // logging
      await this.logAction(action, tableName, userId, recordId, connection);

      // commit transaction
      await connection.commit();
    } catch(error) {
      console.log({error})
      connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = LoggingService