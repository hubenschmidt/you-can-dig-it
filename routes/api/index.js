const router = require('express').Router();
const create = require('./create');
const database = require('./database');
const random = require('./random');

// const random = require('./random');
// const search = require('./search');
router.use('/create', create)
router.use('/database', database)
router.use('/random', random)


//Export an object containing all API routes

module.exports = router