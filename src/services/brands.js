const dbConnection = require("../config/db");
const { v4: uuidv4 } = require('uuid');
const { ERROR_CODES, ACTION_TYPE, TABLE } = require('../utils/constants')
const LoggingService = require('./logging')

class BrandsService {
  constructor() {
    this.loggingService = new LoggingService(); // one instance shared across methods
  }
  /**
   *  ADD BRAND
   */
  async add(req) {
    const { userid, body: brandObj } = req;
    const insertQuery =  `INSERT INTO brand(id, name, origin, logourl) VALUES(?,?,?,?)`;
    const newBrandId = uuidv4();
    const data = [
      newBrandId,
      brandObj.name,
      brandObj.origin || "",
      brandObj.logoUrl || ""
    ];
    
    try {
      await this.loggingService.actionWithLogging(
        ACTION_TYPE.INSERT,
        TABLE.BRAND,
        insertQuery,
        data,
        userid,
        newBrandId
      );
      return "Added succesfully!";
    } catch(err) {
      console.log(err)
      if(err.code === ERROR_CODES.DUPLICATED) throw new Error(ERROR_CODES.DUPLICATED);

      throw new Error("Something went wrong!");
    } 
    
  }

  /**
   *  UPDATE BRAND
   */
  async update(req) {
    const { params: { id: brandId }, body: brandObj, userid} = req;
    const updateQuery = `UPDATE brand SET name = ?, origin = ?, logourl = ? WHERE id = ?`;
    const data = [
      brandObj.name,
      brandObj.origin || "",
      brandObj.logoUrl || "",
      brandId
    ];

    try {
      await this.loggingService.actionWithLogging(
        ACTION_TYPE.UPDATE,
        TABLE.BRAND,
        updateQuery,
        data,
        userid,
        brandId
      );
      return "Updated succesfully!";
    } catch(err) {
      console.log(err)
      if(err.code === ERROR_CODES.DUPLICATED) throw new Error(ERROR_CODES.DUPLICATED);

      throw new Error("Something went wrong!");
    } 
  }

  /**
   *  REMOVE BRAND
   */
  async remove(brandId, userid) {
    const removeQuery = `DELETE FROM brand WHERE id = ?`;
    
    try {
      await this.loggingService.actionWithLogging(
        ACTION_TYPE.DELETE,
        TABLE.BRAND,
        removeQuery,
        [brandId],
        userid,
        brandId
      );
      return "Removed succesfully!";
    } catch(err) {
      if(err.code === ERROR_CODES.IS_REFERENCED) throw new Error(ERROR_CODES.IS_REFERENCED);
      throw new Error(err);
    } 
  }
  
  /**
   *  GET ALL BRANDS
   */
  async getAll() {
    const selectQuery = `SELECT 
      b.id, b.name, b.origin, b.logourl, count(c.id) as total_consoles
      FROM brand b LEFT JOIN console c
      ON b.id = c.id_brand
      GROUP BY b.id`;

    try {
      const rows = await dbConnection.query(selectQuery);
      return rows;
    } catch(err) {
      throw new Error(err);
    } 
    
  }

  /**
   *  GET BRAND BI ID
   */
  async getById(brandId) {
    const selectQuery = `SELECT id, name, origin, logourl FROM brand WHERE id = ?`;

    try {
      const result = await dbConnection.query(selectQuery, [brandId]);
      const brand = result[0];
      return brand || {};
    } catch(err) {
      throw new Error(err);
    } 
    
  }

}

module.exports = BrandsService