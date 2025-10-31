const express = require('express')
const { body } = require('express-validator')
const router = new express.Router()
const verifyJWT = require('../middleware/verifyJWT') 
const consoleController = require('../controllers/consoleController')

router.get('/all', consoleController.getAll)
router.get('/:id', consoleController.getById)
router.post('/add', verifyJWT, [body('name').notEmpty(), body('brandId').notEmpty()], consoleController.add)
router.put('/edit/:id', verifyJWT, [body('name').notEmpty(), body('brandId').notEmpty()], consoleController.update)
router.delete('/remove/:id', verifyJWT, consoleController.remove)
router.get('/brand/:id', consoleController.getByBrand)
router.get('/generation/:gen', consoleController.getByGeneration)

module.exports = router