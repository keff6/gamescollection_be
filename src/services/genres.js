const dbConnection = require("../utils/db");
const { v4: uuidv4 } = require('uuid');

class GenresService {
  /**
   *  ADD GENRE
   */
  async add(genreObj) {
    const insertQuery =  `INSERT INTO genre(id, name) values('${uuidv4()}', '${genreObj.name}')`;
    
    try {
      await dbConnection.query(insertQuery);
      return "Added succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  UPDATE GENRE
   */
  async update(genreId, genreObj) {
    const updateQuery = `UPDATE genre SET name = '${genreObj.updatedName}' where id = '${genreId}'`;

    try {
      await dbConnection.query(updateQuery);
      return "Updated succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
  }

  /**
   *  REMOVE GENRE
   */
  async remove(genreId) {
    const removeQuery = `DELETE FROM genre where id = '${genreId}'`;

    // TODO: sub routine to also delete all lines on game_x_genre table

    try {
      await dbConnection.query(removeQuery);
      return "Removed succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
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
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  GET GENRE BY ID
   */
  async getById(genreId) {
    const selectQuery = `SELECT id,name FROM genre WHERE id = '${genreId}'`;

    try {
      const result = await dbConnection.query(selectQuery);
      const genre = result[0]
      return genre || {};
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

}

module.exports = GenresService