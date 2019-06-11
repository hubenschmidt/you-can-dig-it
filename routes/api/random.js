const router = require('express').Router();
const discogsDatabase = require('../../controllers/discogsDatabase');


//Matches with "/api/random"
router
    .route('/')
    .get(discogsDatabase.randomRelease)

module.exports = router;
