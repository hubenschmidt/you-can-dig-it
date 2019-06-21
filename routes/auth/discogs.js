const router = require('express').Router();
const authController = require('../../controllers/authController');
const passport = require('passport')
const discogsAuth = passport.authenticate('discogs')
var Discogs = require('disconnect').Client;

//route triggered on the client to begin OAuth
//Matches with "/auth/discogs"

router
    .get('/', discogsAuth)

//route triggered by the callback from OAuth provider once
//the user has authenticated successfully

//Matches with "/auth/discogs/callback"

router
    .get('/callback', discogsAuth, authController.discogs)


module.exports = router;