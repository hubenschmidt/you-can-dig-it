const router = require('express').Router();
const create = require('./create');
const database = require('./database');
const landing = require('./landing');
const random = require('./random');
const search = require('./search');
const users = require('./users');

   //protect API endpoints with authentication function 
   function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signin');
}

router.use('/create', create);
router.use('/database', isLoggedIn, database);
router.use('/landing', landing);
router.use('/random', random);
router.use('/search', search);
router.use('/users', users);

//Export an object containing all API routes

module.exports = router