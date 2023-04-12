const express = require('express')
const ConsolesService = require('../services/consoles')
const router = new express.Router()

// Get consoles by manufacturer
router.get('/consolesByManufacturer', async (req, res) => {
  try {
    res.send("TODO: Get all consoles by manufacturer")
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// TODO: Add get consoles by generation

module.exports = router