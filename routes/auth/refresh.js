const router = require('express').Router();
const authController = require('../../controllers/authController');
const passport = require('passport')
const jwtAuth = passport.authenticate('jwt', {session: false})


//routes that are triggered by the callbacks from each OAuth provider once
//the user has authenticated successfully
router
    .route('/callback')
    .get(discogsAuth, authController.discogs)

//routes that are triggered on the client
//Matches with "/auth/refresh"

router
    .route('/')
    .get(jwtAuth, authController.refresh)


module.exports = router;
