const router = require('express').Router();
const databaseRoutes = require('./database');

//Database routes
router.use('/database', databaseRoutes)

module.exports = router;