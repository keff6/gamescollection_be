const dbConnection = require("../utils/db");
const { v4: uuidv4 } = require('uuid');

class GenresService {

  async add(genreObj) {
    const insertQuery =  `INSERT INTO genre(id, name) values('${uuidv4()}', '${genreObj.name}')`;
    
    try {
      await dbConnection.query(insertQuery);
      return "Added succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  async update(genreObj) {
    // TODO: update videogame gender
    return true;
  }

  async remove(genreObj) {
    // TODO: remove videogame gender
    return true;
  }

  async getAll() {
    const selectQuery = 'SELECT * FROM genre';

    try {
      const rows = await dbConnection.query(selectQuery);
      return rows;
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

}

module.exports = GenresService