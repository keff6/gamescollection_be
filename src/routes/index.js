const { Router } = require('express');
const authRoutes = require('./auth.js');
const userRoutes = require('./user.js');
const brandRoutes = require('./brand.js');
const consoleRoutes = require('./console.js');
const exportRoutes = require('./export.js');
const gameRoutes = require('./game.js');
const genreRoutes = require('./genre.js');
const statsRoutes = require('./stats.js');

const router = Router();

router.use('', authRoutes);
router.use('/users', userRoutes);
router.use('/brands', brandRoutes);
router.use('/consoles', consoleRoutes);
router.use('/export', exportRoutes);
router.use('/games', gameRoutes);
router.use('/genres', genreRoutes);
router.use('/stats', statsRoutes);

module.exports = router;