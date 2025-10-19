const InfoService = require('../services/info')

/**
 *  GET TOTALS
 */
const getTotals = async (req, res, next) => {
  try {
    const infoService = new InfoService()
    const totals = await infoService.getTotals()
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
    const infoService = new InfoService()
    const totalGamesByConsole = await infoService.getTotalGamesByConsole()
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
    const infoService = new InfoService()
    const latestAdditions = await infoService.getLatestAdditions()
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
    const infoService = new InfoService()
    const playingGames = await infoService.getPlayingGames()
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
    const infoService = new InfoService()
    const genresDist = await infoService.getGenresDistribution()
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
    const infoService = new InfoService()
    const gamesByCondition = await infoService.getGamesByCondition()
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