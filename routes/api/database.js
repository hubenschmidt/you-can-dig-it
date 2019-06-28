const router = require('express').Router();
const discogsDatabase = require('../../controllers/discogsDatabase');
const searchController = require('../../controllers/searchController')

//Matches with "/api/database"
router
    .route('/')
    .get(discogsDatabase.findAll)

    //Matches with "/api/database/library"
router
    .route('/library')
    .post(searchController.create)

    //Matches with "/api/database/library/:_id"
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