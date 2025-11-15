const dbConnection = require("../config/db");

class StatsService {
  /**
   *  GET TOTALS
   */
  async getTotals() {
    const selectConsolesQuery = `
    SELECT
	    count(c.id) AS totalConsoles,
      sum(CASE When c.is_portable = 1 then 1 else 0 end) AS portable,
      (SELECT 
      CONCAT(b.name,' ',(CASE WHEN c.short_name IS NOT NULL AND c.short_name <> '' THEN c.short_name ELSE c.name END),' (',c.year,')') AS name
      FROM console AS c, brand AS b
      WHERE c.id_brand = b.id
      ORDER BY c.year ASC LIMIT 1) AS oldestConsole,
      (SELECT 
      CONCAT(b.name,' ',(CASE WHEN c.short_name IS NOT NULL AND c.short_name <> '' THEN c.short_name ELSE c.name END),' (',c.year,')') AS name
      FROM console AS c, brand AS b
      WHERE c.id_brand = b.id
      ORDER BY c.year DESC LIMIT 1) AS newestConsole
    FROM console AS c, brand AS b
    WHERE c.id_brand = b.id`;
    const selectGamesQuery = `SELECT count(0) as totalGames FROM game`;
    const selectBrandsQuery = `SELECT count(0) as totalBrands FROM brand`;

    try {
      const [totalConsoles] = await dbConnection.query(selectConsolesQuery);
      const [totalGames] = await dbConnection.query(selectGamesQuery);
      const [totalBrands] = await dbConnection.query(selectBrandsQuery);
      return {
        ...totalConsoles[0],
        ...totalGames[0],
        ...totalBrands[0],
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
      SELECT
        c.year,
        b.name as brand,
        (CASE WHEN c.short_name IS NOT NULL AND c.short_name <> '' THEN c.short_name ELSE c.name END) as console,
        count(0) as total_games
      FROM game AS g, console AS c, brand AS b
      WHERE g.id_console = c.id AND c.id_brand = b.id
      GROUP BY c.id
      ORDER BY c.year ASC`;

    try {
      const [totalGamesByConsole] = await dbConnection.query(selectQuery);
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
      SELECT
        (CASE WHEN c.short_name IS NOT NULL AND c.short_name <> '' THEN c.short_name ELSE c.name END) as console,
        g.title,
        g.year
      FROM logs as l, game as g, console as c
      WHERE action = 'INSERT' AND l.record_id = g.id AND g.id_console = c.id
      ORDER BY created_at DESC
      LIMIT 5`;

    try {
      const [latestAdditions] = await dbConnection.query(selectQuery);
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
      SELECT
        (CASE WHEN c.short_name IS NOT NULL AND c.short_name <> '' THEN c.short_name ELSE c.name END) as console,
        g.title,
        g.year
      FROM game AS g, console AS c
      WHERE g.id_console = c.id AND is_playing = 1
      LIMIT 3`;

    const totalFinished = 'SELECT count(0) as finishedGames FROM game WHERE is_finished = 1'

    try {
      const [playingGames] = await dbConnection.query(selectQuery);
      const [finishedGames] = await dbConnection.query(totalFinished);
      return {
        playingGames,
        ...finishedGames[0],
      };
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
      ORDER BY total DESC
      LIMIT 5`;

    try {
      const [genresDist] = await dbConnection.query(selectQuery);
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
      const [[gamesByCondition]] = await dbConnection.query(selectQuery);
      return gamesByCondition;
    } catch(err) {
      throw new Error(err);
    } 
  }

  /**
   *  GET TOP 5 CONSOLES BY GAMES
   */
  async getTop5Consoles() {
    const selectQuery = `
      SELECT
        c.year,
        b.name as brand,
        (CASE WHEN c.short_name IS NOT NULL AND c.short_name <> '' THEN c.short_name ELSE c.name END) as console,
        count(0) as total_games
      FROM game AS g, console AS c, brand AS b
      WHERE g.id_console = c.id AND c.id_brand = b.id
      GROUP BY c.id
      ORDER BY total_games DESC
      LIMIT 5`;

    try {
      const [consolesByGames] = await dbConnection.query(selectQuery);
      return consolesByGames;
    } catch(err) {
      throw new Error(err);
    } 
  }
  
}

module.exports = StatsService