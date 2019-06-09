const router = require('express').Router();
const database = require('./database');


// const random = require('./random');
// const search = require('./search');
router.use('/database', database)


//Export an object containing all API routes

module.exports = router