const express = require('express')
const { body } = require('express-validator')
const router = new express.Router()
const gameController = require('../controllers/gameController')

router.get('/games', gameController.getAll)
router.get('/games/get', gameController.getByParams)
router.get('/games/wishlist/:consoleId', gameController.getWishlistByConsole)
router.post('/games/search', [body('searchTerm').notEmpty()], gameController.search)
router.post('/games/add', [body('title').notEmpty(), body('consoleId').notEmpty()], gameController.add)
router.put('/games/edit/:id', [body('title').notEmpty(), body('consoleId').notEmpty()], gameController.update)
router.delete('/games/remove/:id', gameController.remove)
router.get('/games/:id', gameController.getById)

module.exports = router