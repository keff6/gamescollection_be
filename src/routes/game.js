const express = require('express')
const { body } = require('express-validator')
const router = new express.Router()
const verifyJWT = require('../middleware/verifyJWT') 
const gameController = require('../controllers/gameController')

router.get('/games', gameController.getAll)
router.get('/games/get', gameController.getByParams)
router.get('/games/wishlist/:consoleId', gameController.getWishlistByConsole)
router.post('/games/search', [body('searchTerm').notEmpty()], gameController.search)
router.post('/games/add', verifyJWT, [body('title').notEmpty(), body('consoleId').notEmpty()], gameController.add)
router.put('/games/edit/:id', verifyJWT, [body('title').notEmpty(), body('consoleId').notEmpty()], gameController.update)
router.delete('/games/remove/:id', verifyJWT, gameController.remove)
router.get('/games/:id', gameController.getById)
router.post('/games/validate', [body('title').notEmpty(), body('consoleId').notEmpty()], gameController.validateTitle)

module.exports = router