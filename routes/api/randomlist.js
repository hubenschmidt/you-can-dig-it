const router = require('express').Router();
const discogsDatabase = require('../../controllers/discogsDatabase');

//Matches with "/api/random"
router
    .route('/')
    .get(discogsDatabase.randomList)

module.exports = router;