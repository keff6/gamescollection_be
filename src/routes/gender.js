const express = require('express')
const { body, validationResult } = require('express-validator');
const GendersService = require('../services/genders')
const router = new express.Router()


router.get('/genders', async (req, res) => {
  try {
    const gendersService = new GendersService()
    const genders = await gendersService.getAll()
    res.send(genders)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// TODO: Add update route

// TODO: Add add route
router.post('/genders/add', body('name').notEmpty(), async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) throw new Error("Something went wrong!");
    const gendersService = new GendersService()
    const gender = await gendersService.add(req.body)
    res.send(gender)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// TODO: Add remove route

module.exports = router