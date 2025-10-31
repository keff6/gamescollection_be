const { validationResult } = require('express-validator');
const UsersService = require('../services/users')

/*
  Register new user
*/
const add = async (req, res, next) => {
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
    next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }
    
    const { body: { userId, newPassword}} = req;

    const usersService = new UsersService()
    const message = await usersService.changePassword(userId, newPassword)
    res.send(message)
  } catch(error) {
    next(error)
  }
}

module.exports = {
  add,
  changePassword,
}