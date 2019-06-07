const router = require('express').Router();
const randomRoutes = require('./random');
const singleRoutes = require('./single')

//Database routes
router.use('/single', singleRoutes)
router.use('/random', randomRoutes)


module.exports = router;