const router = require('express').Router();
const create = require('./create');
const discogsuser = require('./discogsuser')
const database = require('./database');
const unlink = require('./unlink');
const random = require('./random');
const search = require('./search')
const users = require('./users')


router.use('/create', create)
router.use('/discogsuser', discogsuser)
router.use('/database', database)
router.use('/unlink', unlink)
router.use('/random', random)
router.use('/search', search)
router.use('/users', users)


//Export an object containing all API routes

module.exports = router