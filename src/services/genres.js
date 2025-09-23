const dbConnection = require("../config/db");
const { v4: uuidv4 } = require('uuid');
const { ERROR_CODES } = require('../utils/constants')

class GenresService {
  /**
   *  ADD GENRE
   */
  async add(genreObj) {
    const insertQuery =  `INSERT INTO genre(id, name) VALUES(?, ?)`;
    
    const data = [uuidv4(), genreObj.name.replace(/'/g, "\\'")]
    try {
      await dbConnection.query(insertQuery, data);
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
  async update(genreId, genreObj) {
    const updateQuery = `UPDATE genre SET name = ? where id = ?`;
    const data = [genreObj.name.replace(/'/g, "\\'"), genreId];

    try {
      await dbConnection.query(updateQuery, data);
      return "Updated succesfully!";
    } catch(err) {
      if(err.code === ERROR_CODES.DUPLICATED) throw new Error(ERROR_CODES.DUPLICATED);
      
      throw new Error("Something went wrong!");
    } 
  }

  /**
   *  REMOVE GENRE
   */
  async remove(genreId) {
    const removeQuery = `DELETE FROM genre where id = ?`;

    // TODO: sub routine to also delete all lines on game_x_genre table

    try {
      await dbConnection.query(removeQuery, [genreId]);
      return "Removed succesfully!";
    } catch(err) {
      throw new Error(err);
    } 
  }
  
  /**
   *  GET ALL GENRES
   */
  async getAll() {
    const selectQuery = 'SELECT id,name FROM genre ORDER BY name ASC';

    try {
      const rows = await dbConnection.query(selectQuery);
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
      const result = await dbConnection.query(selectQuery, [genreId]);
      const genre = result[0];
      return genre || {};
    } catch(err) {
      throw new Error(err);
    } 
    
  }

}

module.exports = GenresService