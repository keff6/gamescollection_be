const express = require('express')
const { body } = require('express-validator')
const router = new express.Router()
const consoleController = require('../controllers/consoleController')

router.get('/consoles', consoleController.getAll)
router.get('/consoles/:id', consoleController.getById)
router.post('/consoles/add', [body('name').notEmpty(), body('brandId').notEmpty()], consoleController.add)
router.put('/consoles/edit/:id', [body('name').notEmpty(), body('brandId').notEmpty()], consoleController.update)
router.delete('/consoles/remove/:id', consoleController.remove)
router.get('/consoles/brand/:id', consoleController.getByBrand)
router.get('/consoles/generation/:gen', consoleController.getByGeneration)

module.exports = router