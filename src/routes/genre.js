const express = require('express')
const { body } = require('express-validator')
const router = new express.Router()
const verifyJWT = require('../middleware/verifyJWT')  // TODO: Add to private routes
const genreController = require('../controllers/genreController')

router.get('/genres', genreController.getAll)
router.get('/genres/:id', genreController.getById)
router.post('/genres/add', body('name').notEmpty(), genreController.add)
router.put('/genres/edit/:id', body('newName').notEmpty(), genreController.update)
router.delete('/genres/remove/:id', genreController.remove)

module.exports = router