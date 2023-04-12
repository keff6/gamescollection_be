const express = require('express')
const { body, validationResult } = require('express-validator');
const GenresService = require('../services/genres')
const router = new express.Router()


router.get('/genres', async (req, res) => {
  try {
    const genresService = new GenresService()
    const genres = await genresService.getAll()
    res.send(genres)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// TODO: Add update route

// TODO: Add add route
router.post('/genres/add', body('name').notEmpty(), async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) throw new Error("Something went wrong!");
    const genresService = new GenresService()
    const message = await genresService.add(req.body)
    res.send(message)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

// TODO: Add remove route

module.exports = router