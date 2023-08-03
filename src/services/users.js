const dbConnection = require("../utils/db");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

class UsersService {
  /**
   *  ADD NEW USER
   */
  async add(userObj) {
    const passwordHash = await bcrypt.hash(userObj.password, 8);
    const insertQuery =  `INSERT INTO
      user(id, name, lastname, username, password, role, refresh_token)
      values(
        '${uuidv4()}',
        '${userObj.name}',
        '${userObj.lastName || ""}',
        '${userObj.userName}',
        '${passwordHash}',
        '${userObj.role || ""}',
        ''
      )`;
    
    try {
      await dbConnection.query(insertQuery);
      return "Added succesfully!";
    } catch(err) {
      throw new Error(err);
    } 
    
  }

  /*
    Check if user exist, returns user if exist or null if not
  */
  async checkUserByUsername(username) {
    const selectQuery =  `SELECT * FROM user WHERE username='${username}'`;
    
    try {
      const user = await dbConnection.query(selectQuery);
      return user[0] || null;
    } catch(err) {
      throw new Error(err);
    } 
  }

  /*
    Check if user with refresh token exists
  */
    async checkUserByRefreshToken(token) {
      const selectQuery =  `SELECT * FROM user WHERE refresh_token='${token}'`;
      
      try {
        const user = await dbConnection.query(selectQuery);
        return user[0] || null;
      } catch(err) {
        throw new Error(err);
      } 
    }

  /*
    Save curent user refresh token for cross-reference
  */
  async saveUserRefreshToken(userId, refreshToken) {
    const updateQuery =  `UPDATE user
      SET refresh_token='${refreshToken}'
      WHERE id='${userId}'`;
    
    try {
      await dbConnection.query(updateQuery);
      return "Refresh token succesfully set";
    } catch(err) {
      throw new Error(err);
    } 
  }

  /*
    Clear user refresh token on logout
  */
    async clearUserRefreshToken(userId) {
      const updateQuery =  `UPDATE user
        SET refresh_token=''
        WHERE id='${userId}'`;
      
      try {
        await dbConnection.query(updateQuery);
        return "Refresh token succesfully cleared";
      } catch(err) {
        throw new Error(err);
      } 
    }
}

module.exports = UsersService