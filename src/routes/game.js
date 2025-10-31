const express = require('express')
const { body } = require('express-validator')
const router = new express.Router()
const verifyJWT = require('../middleware/verifyJWT') 
const gameController = require('../controllers/gameController')

router.get('/all', gameController.getAll)
router.get('/get', gameController.getByParams)
router.post('/add', verifyJWT, [body('title').notEmpty(), body('consoleId').notEmpty()], gameController.add)
router.put('/edit/:id', verifyJWT, [body('title').notEmpty(), body('consoleId').notEmpty()], gameController.update)
router.delete('/remove/:id', verifyJWT, gameController.remove)
router.get('/:id', gameController.getById)
router.post('/validate', [body('title').notEmpty(), body('consoleId').notEmpty()], gameController.validateTitle)

module.exports = router