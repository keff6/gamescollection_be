const dbConnection = require("../utils/db");
const { v4: uuidv4 } = require('uuid');

class GendersService {

  async add(genderObj) {
    const insertQuery =  `INSERT INTO gender(id, name) values('${uuidv4()}', '${genderObj.name}')`;
    
    try {
      await dbConnection.query(insertQuery);
      return "Added succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  async update(genderObj) {
    // TODO: update videogame gender
    return true;
  }

  async remove(genderObj) {
    // TODO: remove videogame gender
    return true;
  }

  async getAll() {
    const selectQuery = 'SELECT * FROM gender';

    try {
      const rows = await dbConnection.query(selectQuery);
      return rows;
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

}

module.exports = GendersService