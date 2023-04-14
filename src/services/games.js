const dbConnection = require("../utils/db");
const { v4: uuidv4 } = require('uuid');

class GamesService {
  /**
   *  GET ALL GAMES
   */
  async getAll() {
    const selectQuery = `SELECT * FROM game`;

    try {
      const consoles = await dbConnection.query(selectQuery);
      return consoles;
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  ADD GAME
   */
  async add(gameObj) {
    const insertQuery =  `
      INSERT INTO game(id, title, id_console, saga, year, is_new, is_complete, notes)
      values(
        '${uuidv4()}',
        '${gameObj.title}',
        '${gameObj.idConsole}',
        '${gameObj.saga || "[]"}',
        '${gameObj.year || ""}',
        '${gameObj.isNew || 0}',
        '${gameObj.isComplete || 0}',
        '${gameObj.notes || ""}'
      )`;

    try {
      await dbConnection.query(insertQuery);
      return "Added succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  UPDATE GAME
   */
  async update(gameId, gameObj) {
    const updateQuery =  `
      UPDATE game
        SET title = '${gameObj.title}',
        id_console = '${gameObj.idConsole}',
        saga = '${gameObj.saga || "[]"}',
        year = '${gameObj.year || ""}',
        is_new = '${gameObj.isNew || 0}',
        is_complete = '${gameObj.isComplete || 0}',
        notes = '${gameObj.notes || ""}'
      WHERE id = '${gameId}'`;
    
    try {
      await dbConnection.query(updateQuery);
      return "Updated succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  REMOVE GAME
   */
  async remove(gameId) {
    const removeQuery = `DELETE FROM game where id = '${gameId}'`;

    try {
      await dbConnection.query(removeQuery);
      return "Removed succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
  }

  /**
   *  GET GAME BY ID
   */
  async getById(gameId) {
    const selectQuery = `SELECT * FROM game WHERE id = '${gameId}'`;

    try {
      const result = await dbConnection.query(selectQuery);
      const console = result[0];
      return console || {};
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  GET GAMES BY CONSOLE
   */
  async getByConsole(consoleId) {
    const selectQuery = `SELECT * FROM game WHERE id_console = '${consoleId}'`;

    try {
      const games = await dbConnection.query(selectQuery);
      return games;
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
 *  SEARCH GAMES MULTI PARAMETER
 */
  async search(searchParamsObj) {

    const paramBuilder = [];

    for(let param in searchParamsObj){
      paramBuilder.push(`${param} = '${searchParamsObj[param]}'`)
    }

    const paramsString = paramBuilder.join(' AND ')

    const selectQuery = `SELECT * FROM game WHERE ${paramsString}`;

    try {
      const games = await dbConnection.query(selectQuery);
      return games;
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

}

module.exports = GamesService