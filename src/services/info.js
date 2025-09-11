const dbConnection = require("../config/db");

class InfoService {
  /**
   *  GET TOTALS
   */
  async getTotals() {
    const selectQuery = `SELECT count(0) as totalGames FROM game`;

    try {
      const totals = await dbConnection.query(selectQuery);
      return totals[0];
    } catch(err) {
      throw new Error(err);
    } 
    
  }
}

module.exports = InfoService