const router = require('express').Router();
const fetchRoutes = require('./fetch');

//Database routes
router.use('/fetch', fetchRoutes)

module.exports = router;