const { validationResult } = require('express-validator');
const AuthService = require('../services/auth')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DAY_IN_MILLISECONDS } = require('../utils/constants')

/*
  Authenticate user
*/
const login = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Incorrect data!")
      return
    }

    const { username, password } = req.body;
    const authService = new AuthService()
    const foundUser = await authService.checkUserByUsername(username)

    if(!foundUser || !(await bcrypt.compare(password, foundUser.password))){
      res.status(400).send("Username and/or Password Incorrect!")
    } else {
      // create JWT
      const accessToken = jwt.sign(
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' }
      );

      const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '10h' }
      );

      // SAVE the refresh token to DB
      await authService.saveUserRefreshToken(foundUser.id, refreshToken)

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: DAY_IN_MILLISECONDS,
      })

      res.send({
        id: foundUser.id,
        name: foundUser.name,
        lastName: foundUser.lastname,
        role: foundUser.role,
        accessToken
      })
    }
  } catch(error) {
    next(error)
  }
}

/* 
  Refresh Token
*/
const refreshToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const authService = new AuthService()

    if(!cookies?.jwt){
      return res.sendStatus(401)
    }

    const refreshToken = cookies.jwt;
    const foundUser = await authService.checkUserByRefreshToken(refreshToken);
    
    if(!foundUser) return res.sendStatus(403); // Forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
        
        const accessToken = jwt.sign(
          { "username": decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "10h"}
        )
        
        res.send({accessToken})
      }
    )
  } catch(error) {
    next(error)
  }
}


/* 
  Log out
*/
const logout = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const authService = new AuthService()
    
    if(!cookies?.jwt) return res.sendStatus(204); // No content
    
    const refreshToken = cookies.jwt;
    const foundUser = await authService.checkUserByRefreshToken(refreshToken);
    
    if(!foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
      return res.sendStatus(204); 
    }

    // Clear user refresh token on DB
    await authService.clearUserRefreshToken(foundUser.id)

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

    return res.sendStatus(204);  
  } catch(error) {
    next(error)
  }
}

module.exports = {
  login,
  refreshToken,
  logout
}