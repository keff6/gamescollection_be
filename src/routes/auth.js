const express = require('express')
const { body } = require('express-validator');
const router = new express.Router()
const authController = require('../controllers/authController')

router.post('/auth', [body('username').notEmpty(), body('password').notEmpty()], authController.login)
router.get('/refresh', authController.refreshToken)
router.get('/logout', authController.logout)


module.exports = router