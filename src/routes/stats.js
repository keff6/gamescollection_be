const express = require('express')
const router = new express.Router()
const statsController = require('../controllers/statsController')

router.get('/stats/getTotals', statsController.getTotals)
router.get('/stats/getTotalGamesByConsole', statsController.getTotalGamesByConsole)
router.get('/stats/latestAdditions', statsController.getLatestAdditions)
router.get('/stats/nowPlaying', statsController.getPlayingGames)
router.get('/stats/genresDist', statsController.getGenresDistribution)
router.get('/stats/byCondition', statsController.getGamesByCondition)
router.get('/stats/topConsoles', statsController.getTop5Consoles)

module.exports = router