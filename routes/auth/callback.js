const router = require('express').Router();
const discogsAuth = require('../../controllers/disconnectAuth.js');

//Matches with "/callback"
router
    .route('/')
    .get(discogsAuth.callback)
 
module.exports = router;