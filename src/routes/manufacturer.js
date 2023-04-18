const express = require('express')
const { body, validationResult } = require('express-validator');
const ManufacturersService = require('../services/manufacturers')
const router = new express.Router()

/**
 *  GET ALL MANUFACTURERS
 */
router.get('/manufacturers', async (req, res) => {
  try {
    const manufacturersService = new ManufacturersService()
    const manufacturers = await manufacturersService.getAll()
    res.send(manufacturers)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  GET MANUFACTURER BY ID
 */
router.get('/manufacturers/:id', async (req, res) => {
  try {
    const { params: { id: manufacturerId }} = req;
    const manufacturersService = new ManufacturersService()
    const manufacturer = await manufacturersService.getById(manufacturerId)
    res.send(manufacturer)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  ADD MANUFACTURER
 */
router.post('/manufacturers/add', body('name').notEmpty(), async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }
    
    const manufacturersService = new ManufacturersService()
    const message = await manufacturersService.add(req.body)
    res.send(message)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  UPDATE MANUFACTURER
 */
router.put('/manufacturers/edit/:id', body('newName').notEmpty(), async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const { params: { id: manufacturerId }} = req;
    const manufacturersService = new ManufacturersService()
    const message = await manufacturersService.update(manufacturerId, req.body)
    res.send(message)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  REMOVE MANUFACTURER
 */
router.delete('/manufacturers/remove/:id', async (req, res) => {
  try {
    const { params: { id: manufacturerId }} = req;
    const manufacturersService = new ManufacturersService()
    const message = await manufacturersService.remove(manufacturerId)
    res.send(message)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router