const express = require('express')
const GendersService = require('../services/genders')
const router = new express.Router()


router.get('/genders', async (req, res) => {
  try {
    res.send("TODO: Get all parks")
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// TODO: Add update route
// TODO: Add add route
// TODO: Add remove route

module.exports = router