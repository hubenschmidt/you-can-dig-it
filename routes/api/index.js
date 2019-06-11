const router = require('express').Router();
// const authorize = require('./authorize');
const create = require('./create');
const database = require('./database');
const random = require('./random');
const search = require('./search')

// const random = require('./random');
// const search = require('./search');
// router.use('/authorize', authorize)
router.use('/create', create)
router.use('/database', database)
router.use('/random', random)
router.use('/search', search)

//Export an object containing all API routes

module.exports = router