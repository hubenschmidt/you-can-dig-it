const router = require('express').Router();
const discogsAuth = require('../../controllers/discogsAuth.js');

//Matches with "/callback"
router
    .route('/')
    .get(discogsAuth.callback)
 
module.exports = router;

