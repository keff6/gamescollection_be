const express = require('express')
const ManufacturersService = require('../services/manufacturers')
const router = new express.Router()


router.get('/manufacturers', async (req, res) => {
  try {
    res.send("TODO: Get all manufacturers")
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// TODO: Add update route
// TODO: Add add route
// TODO: Add remove route

module.exports = router