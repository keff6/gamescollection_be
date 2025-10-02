const { validationResult } = require('express-validator')
const GamesService = require('../services/games')
const { gamesDataSanitizer } = require('../utils/responseSanitizer');

/**
 *  GET ALL GAMES
 */
const getAll = async (req, res, next) => {
  const { query: { page = 1, limit = 10 }} = req;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    const gamesService = new GamesService()
    const [games, totalPages, totalItems] = await gamesService.getAll(+limit, +offset)
    gamesDataSanitizer(games);
    res.send({
      data: games,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    })
  } catch(error) {
    next(error)
  }
}

/**
 *  GET GAMES BY PARAM [console, year, genre, saga, initialLetter, sortBy]
 */
const getByParams = async (req, res, next) => {
  const { query: getParamsObj } = req;
  const { currentPage = 1, limit = 10 } = getParamsObj;
  const offset = (parseInt(currentPage) - 1) * parseInt(limit);

  try {
    const gamesService = new GamesService()
    const [games, totalPages, totalItems] = await gamesService.getByParams(getParamsObj, offset)
    gamesDataSanitizer(games);
    res.send({
      data: games,
      pagination: {
        totalItems,
        totalPages,
        currentPage,
        pageSize: limit,
      },
    })
  } catch(error) {
    next(error)
  }
}

/**
 *  ADD GAME
 */
const add = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const gamesService = new GamesService()
    const message = await gamesService.add(req.body)
    res.status(201).send(message)
  } catch(error) {
    next(error)
  }
}

/**
 *  UPDATE GAME
 */
const update = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const { params: { id: gameId }} = req;
    const gamesService = new GamesService()
    const message = await gamesService.update(gameId, req.body)
    res.send(message)
  } catch(error) {
    next(error)
  }
}

/**
 *  REMOVE GAME
 */
const remove = async (req, res, next) => {
  try {
    const { params: { id: gameId }} = req;
    const gamesService = new GamesService()
    const message = await gamesService.remove(gameId)
    res.send(message)
  } catch (error) {
    next(error)
  }
}

/**
 *  GET GAME BY ID
 */
const getById = async (req, res, next) => {
  try {
    const { params: { id: gameId }} = req;
    const gamesService = new GamesService()
    const game = await gamesService.getById(gameId)
    res.send(game)
  } catch(error) {
    next(error)
  }
}

/**
 *  VALIDATE IF TITLE EXISTS
 */
const validateTitle = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const { body: { title, consoleId }} = req;
    const gamesService = new GamesService()
    const { found } = await gamesService.validateTitle(title, consoleId);
    const isValid = found === 0;
    res.send(isValid)
  } catch(error) {
    next(error)
  }
}


module.exports = {
  getAll,
  getById,
  getByParams,
  add,
  update,
  remove,
  validateTitle,
}