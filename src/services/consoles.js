const dbConnection = require("../config/db");
const { v4: uuidv4 } = require('uuid');
const { ERROR_CODES } = require('../utils/constants')

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
      throw new Error(err);
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
    FROM console WHERE id = ?`;

    try {
      const result = await dbConnection.query(selectQuery, [consoleId]);
      const console = result[0];
      return console || {};
    } catch(err) {
      throw new Error(err);
    } 
    
  }

  /**
   *  ADD CONSOLE
   */
  async add(consoleObj) {
    const insertQuery =  `
      INSERT INTO console(id, name, id_brand, year, generation, logourl, consoleurl)
      VALUES(?,?,?,?,?,?,?)`;
    
    const data = [
      uuidv4(),
      consoleObj.name,
      consoleObj.brandId,
      consoleObj.year || "",
      consoleObj.generation || "",
      consoleObj.logoUrl || "",
      consoleObj.consoleUrl || ""
    ]
    
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
   *  UPDATE CONSOLE
   */
  async update(consoleId, consoleObj) {
    const updateQuery =  `
      UPDATE console
        SET name = ?,
        id_brand = ?,
        year = ?,
        generation = ?,
        logourl = ?,
        consoleurl = ?
      WHERE id = ?`;

    const data = [
      consoleObj.name,
      consoleObj.brandId,
      consoleObj.year || "",
      consoleObj.generation || "",
      consoleObj.logoUrl || "",
      consoleObj.consoleUrl || "",
      consoleId
    ];

    try {
      await dbConnection.query(updateQuery, data);
      return "Updated succesfully!";
    } catch(err) {
      console.log(err)
      if(err.code === ERROR_CODES.DUPLICATED) throw new Error(ERROR_CODES.DUPLICATED);

      throw new Error("Something went wrong!");
    } 
    
  }

  /**
   *  REMOVE CONSOLE
   */
  async remove(consoleId) {
    const removeConsoleQuery = `DELETE FROM console WHERE id = ?`;
    const removeGamesQuery = `DELETE FROM game WHERE id_console = ?`;

    try {
      // SET SQL transaction
      await dbConnection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');

      // begin transaction
      await dbConnection.beginTransaction();

      await dbConnection.execute(removeConsoleQuery, [consoleId]);
      await dbConnection.execute(removeGamesQuery, [consoleId]);

      // commit transaction
      await dbConnection.commit();

      return "Removed succesfully!";
    } catch(err) {
      dbConnection.rollback();
      throw new Error(err);
    } 
  }

  /**
   *  GET CONSOLES BY BRAND
   */
  async getByBrand(brandId) {
    const selectQuery = `SELECT
      c.id,
      c.name,
      c.id_brand,
      c.year,
      c.generation,
      c.logourl,
      c.consoleurl,
      count(g.id) as total_games
    FROM console c LEFT JOIN game g
    ON c.id = g.id_console
    WHERE c.id_brand = ?
    GROUP BY c.id
    ORDER BY c.year ASC`;

    try {
      const consoles = await dbConnection.query(selectQuery, brandId);
      return consoles;
    } catch(err) {
      throw new Error(err);
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
    FROM console WHERE generation = ?`;

    try {
      const consoles = await dbConnection.query(selectQuery, generation);
      return consoles;
    } catch(err) {
      throw new Error(err);
    } 
    
  }

}

module.exports = ConsolesService