const dbConnection = require("../utils/db");
const { v4: uuidv4 } = require('uuid');

class ConsolesService {
  /**
   *  GET ALL CONSOLES
   */
  async getAll() {
    const selectQuery = `SELECT * FROM console`;

    try {
      const consoles = await dbConnection.query(selectQuery);
      return consoles;
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  GET CONSOLE BY ID
   */
  async getById(consoleId) {
    const selectQuery = `SELECT
      id,
      name,
      id_brand,
      year,
      generation,
      logourl,
      consoleurl
    FROM console WHERE id = '${consoleId}'`;

    try {
      const result = await dbConnection.query(selectQuery);
      const console = result[0];
      return console || {};
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  ADD CONSOLE
   */
  async add(consoleObj) {
    const insertQuery =  `
      INSERT INTO console(id, name, id_brand, year, generation, logourl, consoleurl)
      values(
        '${uuidv4()}',
        '${consoleObj.name}',
        '${consoleObj.brandId}',
        '${consoleObj.year || ""}',
        '${consoleObj.generation || ""}',
        '${consoleObj.logoUrl || ""}',
        '${consoleObj.consoleUrl || ""}'
      )`;
    
    try {
      await dbConnection.query(insertQuery);
      return "Added succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  UPDATE CONSOLE
   */
  async update(consoleId, consoleObj) {
    const updateQuery =  `
      UPDATE console
        SET name = '${consoleObj.name}',
        id_brand = '${consoleObj.brandId}',
        year = '${consoleObj.year || ""}',
        generation = '${consoleObj.generation || ""}',
        logourl = '${consoleObj.logoUrl || ""}',
        consoleurl = '${consoleObj.consoleUrl || ""}'
      WHERE id = '${consoleId}'`;
    
    try {
      await dbConnection.query(updateQuery);
      return "Updated succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  REMOVE CONSOLE
   */
  async remove(consoleId) {
    const removeQuery = `DELETE FROM console where id = '${consoleId}'`;

    try {
      await dbConnection.query(removeQuery);
      return "Removed succesfully!";
    } catch(err) {
      throw new Error(err.messsage);
    } 
  }

  /**
   *  GET CONSOLES BY BRAND
   */
  async getByBrand(brandId) {
    const selectQuery = `SELECT
      id,
      name,
      id_brand,
      year,
      generation,
      logourl,
      consoleurl
    FROM console WHERE id_brand = '${brandId}'`;

    try {
      const consoles = await dbConnection.query(selectQuery);
      return consoles;
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

  /**
   *  GET CONSOLES BY GENERATION
   */
  async getByGeneration(generation) {
    const selectQuery = `SELECT
      id,
      name,
      id_brand,
      year,
      generation,
      logourl,
      consoleurl
    FROM console WHERE generation = '${generation}'`;

    try {
      const consoles = await dbConnection.query(selectQuery);
      return consoles;
    } catch(err) {
      throw new Error(err.messsage);
    } 
    
  }

}

module.exports = ConsolesService