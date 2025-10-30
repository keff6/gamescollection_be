const express = require('express')
const router = new express.Router()
const exportController = require('../controllers/exportController')

router.get('/export/data', exportController.exportData)
// router.get('/export/dump', exportController.exportDbDump) // Disabled for security reasons

module.exports = router