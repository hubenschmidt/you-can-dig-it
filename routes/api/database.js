const router = require('express').Router();
const discogsDatabase = require('../../controllers/discogsDatabase');

//Matches with "/api/database"
router
    .route('/')
    .get(discogsDatabase.findAll)

router
    .route('/library')
    .get(discogsDatabase.getLibrary)

//Matches with "/api/database/:_id"
router
    .route('/:_id')
    .get(discogsDatabase.findById)


module.exports = router;