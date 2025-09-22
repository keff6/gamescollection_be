const dbConnection = require("../config/db");

class InfoService {
  /**
   *  GET TOTALS
   */
  async getTotals() {
    const selectConsolesQuery = `SELECT count(0) as totalConsoles FROM console`;
    const selectGamesQuery = `SELECT count(0) as totalGames FROM game`;

    try {
      const totalConsoles = await dbConnection.query(selectConsolesQuery);
      const totalGames = await dbConnection.query(selectGamesQuery);
      return {
        ...totalConsoles[0],
        ...totalGames[0],
      };
    } catch(err) {
      throw new Error(err);
    } 
    
  }
}

module.exports = InfoService