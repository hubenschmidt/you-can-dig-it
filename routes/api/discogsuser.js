const router = require('express').Router();
const discogsUser = require('../../controllers/discogsUser');

//matches with 'api/discogsuser'

router
    .route('/')
    .get(discogsUser.currentDiscogsUser)

module.exports = router;

