const express = require('express')
const router = new express.Router()
const infoController = require('../controllers/infoController')

router.get('/info/getTotals', infoController.getTotals)

module.exports = router