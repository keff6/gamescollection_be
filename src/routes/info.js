const express = require('express')
const router = new express.Router()
const infoController = require('../controllers/infoController')

router.get('/info/getTotals', infoController.getTotals)
router.get('/info/getTotalGamesByConsole', infoController.getTotalGamesByConsole)
router.get('/info/latestAdditions', infoController.getLatestAdditions)
router.get('/info/playing', infoController.getPlayingGames)
router.get('/info/genresDist', infoController.getGenresDistribution)
router.get('/info/byCondition', infoController.getGamesByCondition)

module.exports = router