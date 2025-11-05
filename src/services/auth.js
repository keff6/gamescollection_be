const dbConnection = require("../config/db");

class AuthService {
  /*
    Check if user exist, returns user if exist or null if not
  */
  async checkUserByUsername(username) {
    const selectQuery =  `SELECT * FROM user WHERE username = ?`;
    
    try {
      const [user] = await dbConnection.query(selectQuery, [username]);
      return user[0] || null;
    } catch(err) {
      throw new Error(err);
    } 
  }

  /*
    Check if user with refresh token exists
  */
    async checkUserByRefreshToken(token) {
      const selectQuery =  `SELECT * FROM user WHERE refresh_token = ?`;
      
      try {
        const [user] = await dbConnection.query(selectQuery, [token]);
        return user[0] || null;
      } catch(err) {
        throw new Error(err);
      } 
    }

  /*
    Save curent user refresh token for cross-reference
  */
  async saveUserRefreshToken(userId, refreshToken) {
    const updateQuery =  `UPDATE user SET refresh_token=? WHERE id=?`;
    
    try {
      await dbConnection.query(updateQuery, [refreshToken, userId]);
      return "Refresh token succesfully set";
    } catch(err) {
      throw new Error(err);
    } 
  }

  /*
    Clear user refresh token on logout
  */
    async clearUserRefreshToken(userId) {
      const updateQuery =  `UPDATE user SET refresh_token='' WHERE id=?`;
      
      try {
        await dbConnection.query(updateQuery, [userId]);
        return "Refresh token succesfully cleared";
      } catch(err) {
        throw new Error(err);
      } 
    }
}

module.exports = AuthService