const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../../controllers/discogsAuth')


//setting up passport middleware for the OAuth provider (more than one can be used)
//for example const twitterAuth = passport.authenticate('twitter')
const discogsAuth = passport.authenticate('discogs')
const jwtAuth = passport.authenticate('jwt', {session: false})

//routes that are triggered by the callbacks from each OAuth provider once
//the user has authenticated successfully
//router.get('/twitter/callback',twitterAuth, authcontroller.twitter)
router.get('/discogs/callback', discogsAuth, authController.discogs)

//routes that are triggered on the client
//router.get('/twitter', twitterAuth)
router.get('/discogs', discogsAuth)

//refresh and hydrate our discogs user on page load
router.get('/refresh', jwtAuth, authController.refresh)

//unlink a provider from the user account
router.delete('/unlink/:provider', jwtAuth, authController.unlink)

//destroy the session when the user logs out
router.get('/logout', jwtAuth, authController.logout)



module.exports = router;
