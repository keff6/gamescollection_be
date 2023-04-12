const express = require('express')
const GamesService = require('../services/games')
const router = new express.Router()

// Get games by console
router.get('/consolesByManufacturer', async (req, res) => {
  try {
    res.send("TODO: Get all consoles by manufacturer")
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// Get games by saga
router.get('/consolesByManufacturer', async (req, res) => {
  try {
    res.send("TODO: Get all consoles by manufacturer")
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// Get games by year
router.get('/consolesByManufacturer', async (req, res) => {
  try {
    res.send("TODO: Get all consoles by manufacturer")
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// Get games by gender
router.get('/consolesByManufacturer', async (req, res) => {
  try {
    res.send("TODO: Get all consoles by manufacturer")
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// Search games by title
router.get('/consolesByManufacturer', async (req, res) => {
  try {
    res.send("TODO: Get all consoles by manufacturer")
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router