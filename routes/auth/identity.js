const router = require('express').Router();
const discogsAuth = require('../../controllers/discogsAuth.js');

//Matches with "/identity"
router
    .route('/')
    .get(discogsAuth.identity)

module.exports = router;
