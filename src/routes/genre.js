const express = require('express')
const { body } = require('express-validator')
const router = new express.Router()
const verifyJWT = require('../middleware/verifyJWT') 
const genreController = require('../controllers/genreController')

router.get('/all', genreController.getAll)
router.get('/:id', verifyJWT, genreController.getById)
router.post('/add', verifyJWT, body('name').notEmpty(), genreController.add)
router.put('/edit/:id', verifyJWT, body('name').notEmpty(), genreController.update)
router.delete('/remove/:id', verifyJWT, genreController.remove)

module.exports = router