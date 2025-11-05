const dbConnection = require("../config/db");
const { v4: uuidv4 } = require('uuid');
const { ERROR_CODES, ACTION_TYPE, TABLE } = require('../utils/constants')
const LoggingService = require('./logging')

class GenresService {
  constructor() {
    this.loggingService = new LoggingService(); // one instance shared across methods
  }
  /**
   *  ADD GENRE
   */
  async add(req) {
    const { userid, body: genreObj } = req;
    const newGenreId = uuidv4();
    const insertQuery =  `INSERT INTO genre(id, name) VALUES(?, ?)`;
    const data = [
      newGenreId,
      genreObj.name.replace(/'/g, "'"),
    ];

    try {
      await this.loggingService.actionWithLogging(
        ACTION_TYPE.INSERT,
        TABLE.GENRE,
        insertQuery,
        data,
        userid,
        newGenreId
      );

      return "Added succesfully!";
    } catch(err) {
      console.log(err)
      if(err.code === ERROR_CODES.DUPLICATED) throw new Error(ERROR_CODES.DUPLICATED);

      throw new Error("Something went wrong!");
    } 
    
  }

  /**
   *  UPDATE GENRE
   */
  async update(req) {
    const { params: { id: genreId }, body: genreObj, userid} = req;
    const updateQuery = `UPDATE genre SET name = ? where id = ?`;
    const data = [genreObj.name.replace(/'/g, "'"), genreId];

    try {
      await this.loggingService.actionWithLogging(
        ACTION_TYPE.UPDATE,
        TABLE.GENRE,
        updateQuery,
        data,
        userid,
        genreId
      );
      // await dbConnection.query(updateQuery, data);
      return "Updated succesfully!";
    } catch(err) {
      if(err.code === ERROR_CODES.DUPLICATED) throw new Error(ERROR_CODES.DUPLICATED);
      
      throw new Error("Something went wrong!");
    } 
  }

  /**
   *  REMOVE GENRE
   */
  async remove(genreId, userId) {
    const removeQuery = `DELETE FROM genre where id = ?`;

    try {
      await this.loggingService.actionWithLogging(
        ACTION_TYPE.DELETE,
        TABLE.GENRE,
        removeQuery,
        [genreId],
        userId,
        genreId
      );
      return "Removed succesfully!";
    } catch(err) {
      if(err.code === ERROR_CODES.IS_REFERENCED) throw new Error(ERROR_CODES.IS_REFERENCED);
      throw new Error(err);
    } 
  }
  
  /**
   *  GET ALL GENRES
   */
  async getAll() {
    const selectQuery = 'SELECT id,name FROM genre ORDER BY name ASC';

    try {
      const [rows] = await dbConnection.query(selectQuery);
      return rows;
    } catch(err) {
      throw new Error(err);
    } 
    
  }

  /**
   *  GET GENRE BY ID
   */
  async getById(genreId) {
    const selectQuery = `SELECT id,name FROM genre WHERE id = ?`;

    try {
      const [result] = await dbConnection.query(selectQuery, [genreId]);
      const genre = result[0];
      return genre || {};
    } catch(err) {
      throw new Error(err);
    } 
    
  }

}

module.exports = GenresService