const dbConnection = require("../config/db");
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
      VALUES(?,?,?,?,?,?,?)`;

    const data = [
      uuidv4(),
      userObj.name,
      userObj.lastName || "",
      userObj.userName,
      passwordHash,
      userObj.role || "",
      ""
    ]
    
    try {
      await dbConnection.query(insertQuery, data);
      return "Added succesfully!";
    } catch(err) {
      throw new Error(err);
    } 
    
  }
}

module.exports = UsersService