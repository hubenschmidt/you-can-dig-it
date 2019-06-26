const router = require('express').Router();
const currentUser = require('../../controllers/currentUser');

//matches with 'api/discogsuser'

router
    .route('/')
    .get(currentUser.currentUser)

module.exports = router;

