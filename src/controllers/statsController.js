const StatsService = require('../services/stats')

/**
 *  GET TOTALS
 */
const getTotals = async (req, res, next) => {
  try {
    const statsService = new StatsService()
    const totals = await statsService.getTotals()
    res.send(totals)
  } catch(error) {
    next(error)
  }
}

/**
 *  GET TOTAL GAMES BY CONSOLE
 */
const getTotalGamesByConsole = async (req, res, next) => {
  try {
    const statsService = new StatsService()
    const totalGamesByConsole = await statsService.getTotalGamesByConsole()
    res.send(totalGamesByConsole)
  } catch(error) {
    next(error)
  }
}

/**
 *  GET LATEST 5 GAME ADDITIONS
 */
const getLatestAdditions = async (req, res, next) => {
  try {
    const statsService = new StatsService()
    const latestAdditions = await statsService.getLatestAdditions()
    res.send(latestAdditions)
  } catch(error) {
    next(error)
  }
}

/**
 *  GET CURENT PLAYING GAMES
 */
const getPlayingGames = async (req, res, next) => {
  try {
    const statsService = new StatsService()
    const playingGames = await statsService.getPlayingGames()
    res.send(playingGames)
  } catch(error) {
    next(error)
  }
}

/**
 *  GET GENNRES DISTRIBUTION
 */
const getGenresDistribution = async (req, res, next) => {
  try {
    const statsService = new StatsService()
    const genresDist = await statsService.getGenresDistribution()
    res.send(genresDist)
  } catch(error) {
    next(error)
  }
}

/**
 *  GET GAMES BY CONDITION
 */
const getGamesByCondition = async (req, res, next) => {
  try {
    const statsService = new StatsService()
    const gamesByCondition = await statsService.getGamesByCondition()
    res.send(gamesByCondition)
  } catch(error) {
    next(error)
  }
}



module.exports = {
  getTotals,
  getTotalGamesByConsole,
  getLatestAdditions,
  getPlayingGames,
  getGenresDistribution,
  getGamesByCondition,
}