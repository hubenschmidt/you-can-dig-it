const router = require('express').Router();
const discogsDatabase = require('../../controllers/discogsDatabase');

//Matches with "/api/database"
router
    .route('/')
    .get(discogsDatabase.findAll)

    //Matches with "/api/database/library"
router
    .route('/library/:_id')
    .get(discogsDatabase.getLibrary)

//Matches with "/api/database/:_id"
router
    .route('/:_id')
    .get(discogsDatabase.findById)

router
    .route('/syncUserReleases/:_id')
    .get(discogsDatabase.syncUserReleases)



module.exports = router;