const dbConnection = require("../utils/db");

class AuthService {
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

module.exports = AuthService