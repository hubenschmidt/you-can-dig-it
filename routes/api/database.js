const router = require('express').Router();
const discogsDatabase = require('../../controllers/discogsDatabase');

//Matches with "/api/database"
router
    .route('/')
    .get(discogsDatabase.findAll)

    //Matches with "/api/database/library"
router
    .route('/library')
    .get(discogsDatabase.getLibrary)

//Matches with "/api/database/:_id"
router
    .route('/:_id')
    .get(discogsDatabase.findById)

router
    .route('/syncUserReleases/:_id')
    .get(discogsDatabase.syncUserReleases)

router
    .route('/getUserReleases/:_id')
    .get(discogsDatabase.serveUserReleases)

module.exports = router;