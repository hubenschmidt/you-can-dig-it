const router = require('express').Router();
const discogsAuth = require('../../controllers/discogsAuth.js');
const colors = require('colors')
const Discogs = require('disconnect').Client;

//Matches with "/authorize"
router
    .route('/')
    .get(discogsAuth.authorize)
 
module.exports = router;
