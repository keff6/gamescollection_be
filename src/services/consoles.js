const dbConnection = require("../config/db");
const { v4: uuidv4 } = require('uuid');
const { ERROR_CODES, ACTION_TYPE, TABLE } = require('../utils/constants')
const LoggingService = require('./logging')

class ConsolesService {
  constructor() {
    this.loggingService = new LoggingService(); // one instance shared across methods
  }
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
      c.id,
      c.name,
      c.id_brand,
      c.year,
      c.generation,
      c.is_portable,
      c.logourl,
      c.consoleurl,
      count(g.id) as total_games
    FROM console c LEFT JOIN game g
    ON c.id = g.id_console
    WHERE c.id = ?`;

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
  async add(req) {
    const { userid, body: consoleObj } = req;
    const newConsoleId = uuidv4();
    const insertQuery =  `
      INSERT INTO console(id, name, id_brand, year, generation, is_portable, logourl, consoleurl)
      VALUES(?,?,?,?,?,?,?,?)`;
    
    const data = [
      newConsoleId,
      consoleObj.name,
      consoleObj.brandId,
      consoleObj.year || "",
      consoleObj.generation || "",
      consoleObj.isPortable || 0,
      consoleObj.logoUrl || "",
      consoleObj.consoleUrl || ""
    ];
    
    try {
      await this.loggingService.actionWithLogging(
        ACTION_TYPE.INSERT,
        TABLE.CONSOLE,
        insertQuery,
        data,
        userid,
        newConsoleId
      );

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
  async update(req) {
    const { params: { id: consoleId }, body: consoleObj, userid} = req;
    const updateQuery =  `
      UPDATE console
        SET name = ?,
        id_brand = ?,
        year = ?,
        generation = ?,
        is_portable = ?,
        logourl = ?,
        consoleurl = ?
      WHERE id = ?`;

    const data = [
      consoleObj.name,
      consoleObj.brandId,
      consoleObj.year || "",
      consoleObj.generation || "",
      consoleObj.isPortable || 0,
      consoleObj.logoUrl || "",
      consoleObj.consoleUrl || "",
      consoleId
    ];

    try {
      await this.loggingService.actionWithLogging(
        ACTION_TYPE.UPDATE,
        TABLE.CONSOLE,
        updateQuery,
        data,
        userid,
        consoleId
      );

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
  async remove(consoleId, userId) {
    const removeConsoleQuery = `DELETE FROM console WHERE id = ?`;

    try {
      await this.loggingService.actionWithLogging(
        ACTION_TYPE.DELETE,
        TABLE.CONSOLE,
        removeConsoleQuery,
        [consoleId],
        userId,
        consoleId
      );
      return "Removed succesfully!";
    } catch(err) {
      if(err.code === ERROR_CODES.IS_REFERENCED) throw new Error(ERROR_CODES.IS_REFERENCED);
      throw new Error(err);
    } 
  }

  /**
   *  GET CONSOLES BY BRAND
   */
  async getByBrand(brandId, type) {
    const selectQuery = `SELECT
      c.id,
      c.name,
      c.id_brand,
      c.year,
      c.generation,
      c.is_portable,
      c.logourl,
      c.consoleurl,
      count(g.id) as total_games
    FROM console c LEFT JOIN game g
    ON c.id = g.id_console
    WHERE c.id_brand = ?
    AND is_portable = COALESCE(?, is_portable)
    GROUP BY c.id
    ORDER BY c.year ASC`;

    try {
      const consoles = await dbConnection.query(selectQuery, [brandId, type]);
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
      is_portable,
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