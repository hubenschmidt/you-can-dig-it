const router = require('express').Router();
const authController = require('../../controllers/authController');
const passport = require('passport')
const discogsAuth = passport.authenticate('discogs')


//routes that are triggered by the callbacks from each OAuth provider once
//the user has authenticated successfully

//Matches with "/auth/discogs/callback"

router
    .route('/callback')
    .get(discogsAuth, authController.discogs)

//routes that are triggered on the client
//Matches with "/auth/discogs"

router
    .route('/')
    .get(discogsAuth)


module.exports = router;