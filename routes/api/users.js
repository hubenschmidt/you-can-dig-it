const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const { DISCOGS_CONFIG } = require('../../config/oauth.providers')
const { Strategy: DiscogsStrategy } = require('passport-discogs')

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const m = require("../../models");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    m.User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
  
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  })(req, res, next);
}); 



router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {

  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            // console.log('this is the user', payload)
            res.json({
              success: true,
              token: "Bearer " + token,
              user: payload
            });

            let currentUserId = payload.id    

            //************************************************************************************/
            // '/api/users/login' displays current user id following login. jwt keeps the user signed in.

            router.get('/login', function(req,res){
              res.json(currentUserId)
            })
            //************************************************************************************/

            
            console.log('currentUserId===================',currentUserId)
          //discogs OAuth=========================================================================================
            function callback(params, token, tokenSecret, user, done){

              let discogsUserData = user._json

              let discogsAccessData = {
                method: 'oauth',
                level: 2,
                consumerKey: process.env.DISCOGS_KEY,
                consumerSecret: process.env.DISCOGS_SECRET,
                token: token,
                tokenSecret: tokenSecret,
                authorizeUrl: `https://www.discogs.com/oauth/authorize?oauth_token=${token}`
              }
              
              // console.log("this is the local user".cyan,payload)
              // console.log('this is the discogs user data'.green, discogsUserData)
              // console.log("this is the discogs access data".magenta, discogsAccessData)

                if(discogsUserData){
                  console.log('begin upsert------>')
                  User
                    .findByIdAndUpdate(payload.id, {discogsUserData: discogsUserData, discogsAccessData: discogsAccessData}, {upsert:true}) 
                    .then(dbModel => console.log(dbModel, '<-----upserted data success'))
                    .catch(err => console.log(500, err)
                    )};
                  done(null, user)
              }

            // Adding Discogs OAuth provider datato passport
            passport.use(new DiscogsStrategy(DISCOGS_CONFIG, callback))

          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
  })(req, res, next);
}); 


// @route GET api/users/currentuser
// @desc Return current user
// @access Private
// router.get(
//   "/currentuser",
//   passport.authenticate("local"),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email
//     });
//   }
// );

module.exports = router;
