const router = require('express').Router();
const authController = require('../../controllers/authController');
const passport = require('passport')
const discogsAuth = passport.authenticate('discogs')


//routes that are triggered by the callbacks from each OAuth provider once
//the user has authenticated successfully
router
    .route('/discogs/callback')
    .get(discogsAuth, authController.discogs)

//routes that are triggered on the client
//route '/auth/discogs'

router
    .route('/discogs')
    .get(discogsAuth, function(req, res){
    res.send('200')
})


module.exports = router;