const express = require('express')
const { body } = require('express-validator');
const router = new express.Router()
const verifyJWT = require('../middleware/verifyJWT')  // TODO: Add to private routes
const brandController = require('../controllers/brandController')

router.get('/brands', brandController.getAll)
router.get('/brands/:id', brandController.getById)
router.post('/brands/add', body('name').notEmpty(), brandController.add)
router.put('/brands/edit/:id', body('name').notEmpty(), brandController.update)
router.delete('/brands/remove/:id', brandController.remove)

module.exports = router