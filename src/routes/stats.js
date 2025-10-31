const express = require('express')
const router = new express.Router()
const statsController = require('../controllers/statsController')

router.get('/getTotals', statsController.getTotals)
router.get('/getTotalGamesByConsole', statsController.getTotalGamesByConsole)
router.get('/latestAdditions', statsController.getLatestAdditions)
router.get('/nowPlaying', statsController.getPlayingGames)
router.get('/genresDist', statsController.getGenresDistribution)
router.get('/byCondition', statsController.getGamesByCondition)
router.get('/topConsoles', statsController.getTop5Consoles)

module.exports = router