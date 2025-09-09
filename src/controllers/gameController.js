const { validationResult } = require('express-validator')
const GamesService = require('../services/games')
const { gamesDataSanitizer } = require('../utils/responseSanitizer');

/**
 *  GET ALL GAMES
 */
const getAll = async (req, res, next) => {
  try {
    const gamesService = new GamesService()
    const games = await gamesService.getAll()
    gamesDataSanitizer(games);
    res.send({games})
  } catch(error) {
    next(error)
  }
}

/**
 *  GET GAMES BY PARAM [console, year, genre, saga, initialLetter, sortBy]
 */
const getByParams = async (req, res, next) => {
  const { query: getParamsObj } = req;

  try {
    const gamesService = new GamesService()
    const {games, total} = await gamesService.getByParams(getParamsObj)
    gamesDataSanitizer(games);
    res.send({games, ...total})
  } catch(error) {
    next(error)
  }
}

/**
 *  GET WISHLIST BY CONSOLE
 */
const getWishlistByConsole = async (req, res, next) => {
  const { params: { consoleId }} = req;

  try {
    const gamesService = new GamesService()
    const {games, total}  = await gamesService.getWishlistByConsole(consoleId)
    gamesDataSanitizer(games);
    res.send({games, ...total})
  } catch(error) {
    next(error)
  }
}

/**
 *  SEARCH GAMES BY TITLE
 */
const search = async (req, res, next) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    res.status(400).send("No search params provided!")
    return
  }

  const { searchTerm, consoleId } = req.body;

  try {
    const gamesService = new GamesService()
    const games = await gamesService.search(searchTerm, consoleId)
    gamesDataSanitizer(games)
    res.send({games})
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
  getWishlistByConsole,
  search,
  add,
  update,
  remove,
  validateTitle,
}