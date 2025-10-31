const express = require('express')
const { body } = require('express-validator');
const router = new express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const brandController = require('../controllers/brandController')

router.get('/all', brandController.getAll)
router.get('/:id', brandController.getById)
router.post('/add', verifyJWT, body('name').notEmpty(), brandController.add)
router.put('/edit/:id', verifyJWT, body('name').notEmpty(), brandController.update)
router.delete('/remove/:id', verifyJWT, brandController.remove)

module.exports = router