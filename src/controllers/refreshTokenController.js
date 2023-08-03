const express = require('express')
const { body, validationResult } = require('express-validator');
const UsersService = require('../services/users')
const router = new express.Router()
const jwt = require('jsonwebtoken');


/*
  Refresh Token
*/
const handleRefreshToken = (req, res) => {
  try {
    const cookies = req.cookies;
    const usersService = new UsersService()
    

    if(!cookies?.jwt){
      return res.sendStatus(401)
    } 
    console.log(cookies)

    const refreshToken = cookies.jwt;
    const foundUser = await usersService.checkUserByRefreshToken(refreshToken);
    
    if(!foundUser) return res.sendStatus(403); // Forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
        
        const accessToken = jwt.sign(
          { "username": decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s"}
        )
        
        res.send({accessToken})
      }
    )
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})


module.exports = router