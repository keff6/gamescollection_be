const express = require('express')
const { body, validationResult } = require('express-validator')
const GamesService = require('../services/games')
const { gamesDataSanitizer } = require('../utils/responseSanitizer');
const router = new express.Router()

/**
 *  GET ALL GAMES
 */
router.get('/games', async (req, res) => {
  try {
    const gamesService = new GamesService()
    const games = await gamesService.getAll()
    gamesDataSanitizer(games);
    res.send({games})
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  GET GAMES BY PARAM [console, year, genre, saga, initialLetter, sortBy]
 */
router.get('/games/get', async (req, res) => {
  const { query: getParamsObj } = req;

  try {
    const gamesService = new GamesService()
    const games = await gamesService.getByParams(getParamsObj)
    gamesDataSanitizer(games);
    res.send({games})
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  GET WISHLIST BY CONSOLE
 */
router.get('/games/wishlist/:consoleId', async (req, res) => {
  const { params: { consoleId }} = req;

  try {
    const gamesService = new GamesService()
    const games = await gamesService.getWishlistByConsole(consoleId)
    gamesDataSanitizer(games);
    res.send({games})
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  SEARCH GAMES BY TITLE
 */
router.post('/games/search', [body('searchTerm').notEmpty()],
async (req, res) => {
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
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  ADD GAME
 */
router.post('/games/add', [body('title').notEmpty(), body('consoleId').notEmpty()],
  async (req, res) => {
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
      console.log(error)
      res.status(500).send(error)
    }
})

/**
 *  UPDATE GAME
 */
router.put('/games/edit/:id', [body('title').notEmpty(), body('consoleId').notEmpty()],
  async (req, res) => {
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
      console.log(error)
      res.status(500).send(error)
    }
})

/**
 *  REMOVE GAME
 */
router.delete('/games/remove/:id', async (req, res) => {
  try {
    const { params: { id: gameId }} = req;
    const gamesService = new GamesService()
    const message = await gamesService.remove(gameId)
    res.send(message)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})


/**
 *  GET GAME BY ID
 */
router.get('/games/:id', async (req, res) => {
  try {
    const { params: { id: gameId }} = req;
    const gamesService = new GamesService()
    const game = await gamesService.getById(gameId)
    res.send(game)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})






module.exports = router