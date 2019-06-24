const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require('../models/User');
const keys = require("../config/keys");
const LocalStrategy = require('passport-local')
// const { DISCOGS_CONFIG } = require('./oauth.providers')
// const passport = require('passport')
// const { Strategy: DiscogsStrategy } = require('passport-discogs')
// const Discogs = require('disconnect').Client;
// const colors = require('colors')
// const axios = require('axios')

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
console.log(opts.jwtFromRequest)

module.exports = passport => {
//for local user authentication ========================

// Allowing passport to serialize and deserialize users into sessions
passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

  // passport.use(
  //   new JwtStrategy(opts, (jwt_payload, done) => {
  //     console.log('jwt_payload',jwt_payload)
  //     User.findById(jwt_payload.id)
  //       .then(user => {
  //         userInfo = user;
  //         if (user) {
  //           return done(null, user);
  //         }
  //         return done(null, false);
  //       })
  //       .catch(err => console.log(err));
  //   })
  // );

  
  passport.use('local',new LocalStrategy(
    function(email, password, done){
      User.findOne({ email: email}, function(err, user) {
        if (err) { return done(err); }
        if (!user) {return done(null, false); }
        // if (!user.verifyPassword(password)) {return done(null, false); }
        return done(null, user);
      });
    }
  ))

};
