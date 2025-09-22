const dbConnection = require("../config/db");
const { v4: uuidv4 } = require('uuid');

class GamesService {
  /**
   *  GET ALL GAMES
   */
  async getAll() {
    const selectQuery = `SELECT
        id,
        title,
        id_console,
        saga,
        year,
        developer,
        publisher,
        is_new,
        is_complete,
        is_wishlist,
        is_digital,
        notes,
        coverurl
      FROM game`;

    try {
      const consoles = await dbConnection.query(selectQuery);
      return consoles;
    } catch(err) {
      throw new Error(err);
    } 
    
  }

  /**
   *  ADD GAME
   */
  async add(gameObj) {
    const newGameId = uuidv4();

    const insertQuery =  `
      INSERT INTO game(id, title, id_console, saga, year, developer, publisher, is_new, is_complete, is_wishlist, is_digital, notes, coverurl)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const data = [
      newGameId,
      gameObj.title.replace(/'/g, "\\'"),
      gameObj.consoleId,
      gameObj.saga || "[]",
      gameObj.year || "",
      gameObj.developer || "",
      gameObj.publisher || "",
      gameObj.isNew || 0,
      gameObj.isComplete || 0,
      gameObj.isWishlist || 0,
      gameObj.isDigital || 0,
      gameObj.notes.replace(/'/g, "\\'") || "",
      gameObj.coverUrl || ""
    ]
    
    const gameGenres = gameObj.genres || []

    try {
      // SET SQL transaction
      await dbConnection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');

      // begin transaction
      await dbConnection.beginTransaction();

      await dbConnection.execute(insertQuery, data);

      if (gameGenres.length > 0) {
        for(let genreId of gameGenres) {
          await dbConnection.execute(`INSERT INTO game_x_genre (id_game, id_genre) VALUES ('${newGameId}', '${genreId}')`);
        }
      }

      // commit transaction
      await dbConnection.commit();

      return "Added succesfully!";
    } catch(err) {
      dbConnection.rollback();
      throw new Error(err);
    } 
    
  }

  /**
   *  UPDATE GAME
   */
  async update(gameId, gameObj) {
    const updateQuery =  `
      UPDATE game
        SET title = ?,
        id_console = ?,
        saga = ?,
        year = ?,
        developer = ?,
        publisher = ?,
        is_new = ?,
        is_complete = ?,
        is_wishlist = ?,
        is_digital = ?,
        notes = ?,
        coverurl = ?
      WHERE id = ?`;

    const data = [
      gameObj.title.replace(/'/g, "\\'"),
      gameObj.consoleId,
      gameObj.saga || "[]",
      gameObj.year || "",
      gameObj.developer || "",
      gameObj.publisher || "",
      gameObj.isNew || 0,
      gameObj.isComplete || 0,
      gameObj.isWishlist || 0,
      gameObj.isDigital || 0,
      gameObj.notes.replace(/'/g, "\\'") || "",
      gameObj.coverUrl || "",
      gameId
    ];

    const gameGenres = gameObj.genres || []

    
    try {
      // SET SQL transaction
      await dbConnection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');

      // begin transaction
      await dbConnection.beginTransaction();

      await dbConnection.execute(updateQuery, data);
      await dbConnection.execute(`DELETE FROM game_x_genre where id_game = ?`, [gameId])

      if (gameGenres.length > 0) {
        for(let genreId of gameGenres) {
          await dbConnection.execute(`INSERT INTO game_x_genre (id_game, id_genre) VALUES (?, ?)`, [gameId, genreId]);
        }
      }

      // commit transaction
      await dbConnection.commit();

      return "Updated succesfully!";
    } catch(err) {
      dbConnection.rollback();
      throw new Error(err);
    } 
    
  }

  /**
   *  REMOVE GAME
   */
  async remove(gameId) {
    const removeQuery = `DELETE FROM game where id = ?`;

    try {
      await dbConnection.query(removeQuery, [gameId]);
      return "Removed succesfully!";
    } catch(err) {
      throw new Error(err);
    } 
  }

  /**
   *  GET GAME BY ID
   */
  async getById(gameId) {
    const selectQuery = `SELECT
        id,
        title,
        id_console,
        saga,
        year,
        developer,
        publisher,
        is_new,
        is_complete,
        is_wishlist,
        is_digital,
        notes,
        coverurl
    FROM game WHERE id = ?`;

    try {
      const result = await dbConnection.query(selectQuery, [gameId]);
      const console = result[0];
      return console || {};
    } catch(err) {
      throw new Error(err);
    } 
    
  }

  /**
   *  GET WISHLIST BY CONSOLE
   */
  async getWishlistByConsole(consoleId) {
    const selectQuery = `SELECT
      id,
      title,
      id_console,
      saga,
      year,
      developer,
      publisher,
      is_new,
      is_complete,
      is_wishlist,
      is_digital,
      notes,
      coverurl
    FROM game WHERE id_console = ?
    AND is_wishlist = 1`;

    const totalQuery = `SELECT Count(0) as total
        FROM game WHERE id_console=?`

    try {
      const games = await dbConnection.query(selectQuery, [consoleId]);
      const total = await dbConnection.query(totalQuery, [consoleId]);
        return {
          games: games || [],
          total: total && total[0] || 0,
        }
    } catch(err) {
      throw new Error(err);
    } 
    
  }


    /**
   *  GET GAMES BY PARAMS [console, year, genre, saga, initialLetter, sortBy]
   *  call GET_GAMES(idConsole, year, genre, saga, initialLetter, sortBy);
   */
    async getByParams(paramsObj) {
      
      const {
        idConsole = '',
        year = '',
        genre =  '',
        saga =  '',
        initialLetter = '',
        sortBy = '',
      } = paramsObj;

      const selectQuery = `call GET_GAMES(
        ${idConsole ? "'" + idConsole + "'" : null},
        ${year ? "'" + year + "'" : null},
        ${genre ? "'" + genre + "'" : null},
        ${saga ? "'" + saga + "'" : null},
        ${initialLetter ? "'" + initialLetter + "'" : "''"},
        ${sortBy ? "'" + sortBy + "'" : null})`;

      const totalQuery = `SELECT Count(0) as total
        FROM game WHERE id_console=?`
  
      try {
        const games = await dbConnection.query(selectQuery);
        const total = await dbConnection.query(totalQuery,[idConsole]);
        return {
          games: games && games[0] || [],
          total: total && total[0] || 0,
        }
      } catch(err) {
        throw new Error(err);
      }
    }

  /**
 *  SEARCH GAMES BY TITLE
 */
  async search(searchTerm, consoleId) {
    const selectQuery = `SELECT
        id,
        title,
        id_console,
        saga,
        year,
        developer,
        publisher,
        is_new,
        is_complete,
        is_wishlist,
        is_digital,
        notes,
        coverurl
      FROM game
      WHERE LOWER(REPLACE(title, ' ', '')) Like LOWER(REPLACE('%?%', ' ', ''))
      AND id_console=?`;

    try {
      const games = await dbConnection.query(selectQuery,[searchTerm,consoleId]);
      return games;
    } catch(err) {
      throw new Error(err);
    } 
    
  }

  /*
  *  Validates if title already exists. return true if not found
  */
  async validateTitle(title, consoleId) {
    const selectQuery = `SELECT
      count(0) as found
      FROM game
      WHERE id_console = ?
      AND title = ?`;

    try {
      const found = await dbConnection.query(selectQuery, [consoleId, title]);
      return found[0];
    } catch(err) {
      throw new Error(err);
    } 
  }

}

module.exports = GamesService