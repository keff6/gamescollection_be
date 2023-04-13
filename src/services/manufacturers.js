const dbConnection = require("../utils/db");
const { v4: uuidv4 } = require('uuid');

class ManufacturersService {
  /**
   *  ADD MANUFACTURER
   */
  async add(manufacturerObj) {
    const insertQuery =  `INSERT INTO manufacturer(id, name, origin) values('${uuidv4()}', '${manufacturerObj.name}', '${manufacturerObj.origin || ""}')`;
    
    try {
      await dbConnection.query(insertQuery);
      return "Added succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  UPDATE MANUFACTURER
   */
  async update(manufacturerId, manufacturerObj) {
    const updateQuery = `UPDATE manufacturer SET name = '${manufacturerObj.newName}', origin = '${manufacturerObj.newOrigin || ""}' where id = '${manufacturerId}'`;

    try {
      await dbConnection.query(updateQuery);
      return "Updated succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
  }

  /**
   *  REMOVE MANUFACTURER
   */
  async remove(manufacturerId) {
    const removeQuery = `DELETE FROM manufacturer where id = '${manufacturerId}'`;

    // TODO: sub routine to also delete all lines on game_x_genre table

    try {
      await dbConnection.query(removeQuery);
      return "Removed succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
  }
  
  /**
   *  GET ALL MANUFACTURERS
   */
  async getAll() {
    const selectQuery = 'SELECT * FROM manufacturer';

    try {
      const rows = await dbConnection.query(selectQuery);
      return rows;
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  GET MANUFACTURER BI ID
   */
  async getById(manufacturerId) {
    const selectQuery = `SELECT * FROM manufacturer WHERE id = '${manufacturerId}'`;

    try {
      const result = await dbConnection.query(selectQuery);
      const manufacturer = result[0];
      return manufacturer || {};
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

}

module.exports = ManufacturersService