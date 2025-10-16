const { validationResult } = require('express-validator');
const GenresService = require('../services/genres')

/**
 *  GET ALL GENRES
 */
const getAll = async (req, res, next) => {
  try {
    const genresService = new GenresService()
    const genres = await genresService.getAll()
    res.send({genres})
  } catch(error) {
    next(error)
  }
}

/**
 *  GET GENRE BY ID
 */
const getById =  async (req, res, next) => {
  try {
    const { params: { id: genreId }} = req;
    const genresService = new GenresService()
    const genre = await genresService.getById(genreId)
    res.send(genre)
  } catch(error) {
    next(error)
  }
}

/**
 *  ADD GENRE
 */
const add = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const genresService = new GenresService()
    const message = await genresService.add(req)
    res.status(201).send(message)
  } catch(error) {
    next(error)
  }
}

// /**
//  *  UPDATE GENRE
//  */
const update = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const genresService = new GenresService()
    const message = await genresService.update(req)
    res.send(message)
  } catch(error) {
    next(error)
  }
}

/**
 *  REMOVE GENRE
 */
const remove = async (req, res, next) => {
  try {
    const { params: { id: genreId }, userid } = req;
    const genresService = new GenresService()
    const message = await genresService.remove(genreId, userid)
    res.send(message)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
}