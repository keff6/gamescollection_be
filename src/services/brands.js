const dbConnection = require("../config/db");
const { v4: uuidv4 } = require('uuid');

class BrandsService {
  /**
   *  ADD BRAND
   */
  async add(brandObj) {
    const insertQuery =  `INSERT INTO
      brand(id, name, origin, logourl)
      VALUES('${uuidv4()}', '${brandObj.name}', '${brandObj.origin || ""}', '${brandObj.logoUrl || ""}')`;
    
    try {
      await dbConnection.query(insertQuery);
      return "Added succesfully!";
    } catch(err) {
      throw new Error(err);
    } 
    
  }

  /**
   *  UPDATE BRAND
   */
  async update(brandId, brandObj) {
    const updateQuery = `UPDATE brand
      SET
        name = '${brandObj.name}',
        origin = '${brandObj.origin || ""}',
        logourl = '${brandObj.logoUrl || ""}'
      WHERE id = '${brandId}'`;

    try {
      await dbConnection.query(updateQuery);
      return "Updated succesfully!";
    } catch(err) {
      throw new Error(err);
    } 
  }

  /**
   *  REMOVE BRAND
   */
  async remove(brandId) {
    const removeQuery = `DELETE FROM brand WHERE id = '${brandId}'`;

    // TODO: sub routine to also delete all lines on game_x_genre table

    try {
      await dbConnection.query(removeQuery);
      return "Removed succesfully!";
    } catch(err) {
      throw new Error(err);
    } 
  }
  
  /**
   *  GET ALL BRANDS
   */
  async getAll() {
    const selectQuery = 'SELECT id, name, origin, logourl FROM brand';

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
    const selectQuery = `SELECT id, name, origin, logourl FROM brand WHERE id = '${brandId}'`;

    try {
      const result = await dbConnection.query(selectQuery);
      const brand = result[0];
      return brand || {};
    } catch(err) {
      throw new Error(err);
    } 
    
  }

}

module.exports = BrandsService