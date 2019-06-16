const router = require('express').Router();
const discogsAuth = require('../../controllers/discogsAuth.js');

//Matches with "/authorize"
router
    .route('/')
    .get(discogsAuth.authorize)
 
module.exports = router;