const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require('../models/User');
const keys = require("../config/keys");
const { DISCOGS_CONFIG } = require('./oauth.providers')
const passport = require('passport')
const { Strategy: DiscogsStrategy } = require('passport-discogs')
const Discogs = require('disconnect').Client;
const colors = require('colors')

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = () => {

//for local user authentication ========================

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);

//for OAuth authentication ========================
   // Allowing passport to serialize and deserialize users into sessions
   passport.serializeUser((user, cb) => cb(null, user))
   passport.deserializeUser((obj, cb) => cb(null, obj))

 // The callback that is invoked when an OAuth provider sends back user 
  // information. Save the user to the database in this callback

  function callback(params, token, tokenSecret, user, done){
    console.log('token'.cyan, token)
    console.log('tokenSecret'.cyan, tokenSecret)
    console.log('user', user)
    done(null, user)
  }
  
  // Adding Discogs OAuth provider datato passport
  passport.use(new DiscogsStrategy(DISCOGS_CONFIG, callback))


};
