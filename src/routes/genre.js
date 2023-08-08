const express = require('express')
const { body } = require('express-validator')
const router = new express.Router()
const verifyJWT = require('../middleware/verifyJWT') 
const genreController = require('../controllers/genreController')

router.get('/genres',verifyJWT, genreController.getAll)
router.get('/genres/:id', verifyJWT, genreController.getById)
router.post('/genres/add', verifyJWT, body('name').notEmpty(), genreController.add)
router.put('/genres/edit/:id', verifyJWT, body('name').notEmpty(), genreController.update)
router.delete('/genres/remove/:id', verifyJWT, genreController.remove)

module.exports = router