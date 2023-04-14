const express = require('express')
const { body, validationResult } = require('express-validator')
const GamesService = require('../services/games')
const router = new express.Router()

/**
 *  GET ALL GAMES
 */
router.get('/games', async (req, res) => {
  try {
    const gamesService = new GamesService()
    const games = await gamesService.getAll()
    res.send(games)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  ADD GAME
 */
router.post('/games/add', [body('title').notEmpty(), body('idConsole').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) throw new Error("Something went wrong!");

      const gamesService = new GamesService()
      const message = await gamesService.add(req.body)
      res.send(message)
    } catch(error) {
      console.log(error)
      res.status(500).send(error)
    }
})

/**
 *  UPDATE GAME
 */
router.put('/games/edit/:id', [body('title').notEmpty(), body('idConsole').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) throw new Error("Something went wrong!");

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

module.exports = router