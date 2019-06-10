const router = require('express').Router();
const discogsDatabase = require('../../controllers/discogsDatabase');


//Matches with "/api/random/:id"
router
    .route('/:id')
    .get(discogsDatabase.randomRelease)

module.exports = router;
