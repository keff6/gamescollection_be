const dbConnection = require("../config/db");
const { v4: uuidv4 } = require('uuid');
const { ERROR_CODES } = require('../utils/constants')

class BrandsService {
  /**
   *  ADD BRAND
   */
  async add(brandObj) {
    const insertQuery =  `INSERT INTO brand(id, name, origin, logourl) VALUES(?,?,?,?)`;
    const data = [
      uuidv4(),
      brandObj.name,
      brandObj.origin || "",
      brandObj.logoUrl || ""
    ];
    
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
   *  UPDATE BRAND
   */
  async update(brandId, brandObj) {
    const updateQuery = `UPDATE brand SET name = ?, origin = ?, logourl = ? WHERE id = ?`;
    const data = [
      brandObj.name,
      brandObj.origin || "",
      brandObj.logoUrl || "",
      brandId
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
   *  REMOVE BRAND
   */
  async remove(brandId) {
    const removeQuery = `DELETE FROM brand WHERE id = ?`;
    
    try {
      await dbConnection.query(removeQuery, [brandId]);
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