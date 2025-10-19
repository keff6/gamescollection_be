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

  /**
   *  GET TOTAL GAMES BY CONSOLE
   */
  async getTotalGamesByConsole() {
    const selectQuery = `
      SELECT c.id, b.name, c.name, count(0) as total_games
      FROM game AS g, console AS c, brand AS b
      WHERE g.id_console = c.id AND c.id_brand = b.id
      GROUP BY c.id`;

    try {
      const totalGamesByConsole = await dbConnection.query(selectQuery);
      return totalGamesByConsole;
    } catch(err) {
      throw new Error(err);
    } 
  }

  /**
   *  GET LATEST 5 GAMES ADDED
   */
  async getLatestAdditions() {
    const selectQuery = `
      SELECT c.name, g.title, g.year
      FROM logs as l, game as g, console as c
      WHERE action = 'INSERT' AND l.record_id = g.id AND g.id_console = c.id
      ORDER BY created_at DESC
      LIMIT 5`;

    try {
      const latestAdditions = await dbConnection.query(selectQuery);
      return latestAdditions;
    } catch(err) {
      throw new Error(err);
    } 
  }

  /**
   *  GET CURRENT PLAYING GAMES
   */
  async getPlayingGames() {
    const selectQuery = `
      SELECT id, title FROM game WHERE is_playing = 1`;

    try {
      const playingGames = await dbConnection.query(selectQuery);
      return playingGames;
    } catch(err) {
      throw new Error(err);
    } 
  }

  /**
   *  GET GENRES DISTRIBUTION
   */
  async getGenresDistribution() {
    const selectQuery = `
      SELECT gen.name, count(0) AS total
      FROM game_x_genre AS gxg, genre AS gen
      WHERE gxg.id_genre = gen.id
      GROUP BY gen.id
      ORDER BY total DESC`;

    try {
      const genresDist = await dbConnection.query(selectQuery);
      return genresDist;
    } catch(err) {
      throw new Error(err);
    } 
  }

  /**
   *  GET GAMES BY CONDITION
   */
  async getGamesByCondition() {
    const selectQuery = `
      SELECT
        SUM(is_new) as new,
        SUM(is_complete) as complete,
        SUM(is_digital) AS digital,
        (count(0) - (SUM(is_new) + SUM(is_complete) + SUM(is_digital))) AS incomplete
      FROM game`;

    try {
      const gamesByCondition= await dbConnection.query(selectQuery);
      return gamesByCondition;
    } catch(err) {
      throw new Error(err);
    } 
  }

  
}

module.exports = InfoService