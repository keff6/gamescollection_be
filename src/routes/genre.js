const express = require('express')
const { body, validationResult } = require('express-validator');
const GenresService = require('../services/genres')
const router = new express.Router()
const verifyJWT = require('../middleware/verifyJWT')

/**
 *  GET ALL GENRES
 */
router.get('/genres',verifyJWT, async (req, res) => {
  try {
    const genresService = new GenresService()
    const genres = await genresService.getAll()
    res.send({genres})
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  GET GENRE BY ID
 */
router.get('/genres/:id', async (req, res) => {
  try {
    const { params: { id: genreId }} = req;
    const genresService = new GenresService()
    const genre = await genresService.getById(genreId)
    res.send(genre)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  ADD GENRE
 */
router.post('/genres/add', body('name').notEmpty(), async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const genresService = new GenresService()
    const message = await genresService.add(req.body)
    res.status(201).send(message)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  UPDATE GENRE
 */
router.put('/genres/edit/:id', body('updatedName').notEmpty(), async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const { params: { id: genreId }} = req;
    const genresService = new GenresService()
    const message = await genresService.update(genreId, req.body)
    res.send(message)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})



/**
 *  REMOVE GENRE
 */
router.delete('/genres/remove/:id', async (req, res) => {
  try {
    const { params: { id: genreId }} = req;
    const genresService = new GenresService()
    const message = await genresService.remove(genreId)
    res.send(message)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router