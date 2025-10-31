const express = require('express')
const { body } = require('express-validator');
const router = new express.Router()
const userController = require('../controllers/userController')

/*
  Register new user
*/
router.post('/add', [
  body('name').notEmpty(),
  body('userName').notEmpty(),
  body('password').notEmpty(),
], userController.add);
router.put('/changePassword', body('newPassword').notEmpty(), body('userId').notEmpty(), userController.changePassword)

module.exports = router