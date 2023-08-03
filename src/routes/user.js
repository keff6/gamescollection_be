const express = require('express')
const { body, validationResult } = require('express-validator');
const UsersService = require('../services/users')
const router = new express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*
  Register new user
*/
router.post('/users/add', [
  body('name').notEmpty(),
  body('userName').notEmpty(),
  body('password').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const usersService = new UsersService()
    const message = await usersService.add(req.body)
    res.send(message)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
});

/*
  Authenticate user
*/
router.post('/auth', [
  body('username').notEmpty(),
  body('password').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Incorrect data!")
      return
    }

    const { username, password } = req.body;
    const usersService = new UsersService()
    const foundUser = await usersService.checkUserByUsername(username)

    if(!foundUser || !(await bcrypt.compare(password, foundUser.password))){
      res.status(400).send("Username and/or Password Incorrect!")
    } else {
      // create JWT
      const accessToken = jwt.sign(
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' } // change to 15 minutes once dev ready
      );

      const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      // AVE the refresh token to DB
      await usersService.saveUserRefreshToken(foundUser.id, refreshToken)

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day in miliseconds
      })

      res.send({accessToken})
    }
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/* 
  Refresh Token
*/
router.get('/refresh', async (req, res) => {
  try {
    const cookies = req.cookies;
    const usersService = new UsersService()
    

    if(!cookies?.jwt){
      return res.sendStatus(401)
    }

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
          { expiresIn: "1d"}
        )
        
        res.send({accessToken})
      }
    )
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})


/* 
  Log out
*/
router.get('/logout', async (req, res) => {
  try {
    const cookies = req.cookies;
    const usersService = new UsersService()
    
    if(!cookies?.jwt) return res.sendStatus(204); // No content
    
    const refreshToken = cookies.jwt;
    const foundUser = await usersService.checkUserByRefreshToken(refreshToken);
    
    if(!foundUser) {
      res.clearCookie('jwt', { httpOnly: true })
      return res.sendStatus(204); 
    }

    // Clear user refresh token on DB
    await usersService.clearUserRefreshToken(foundUser.id)

    res.clearCookie('jwt', { httpOnly: true })

    return res.sendStatus(204);  
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})



module.exports = router