const passport = require ("passport");
const { Strategy: DiscogsStrategy } = require("passport-discogs")
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { DISCOGS_CONFIG } = require("../config/oauth.js")
const mongoose = require("mongoose");
const m = require("../models")
const keys = require("../config/keys");


module.exports = () => {

    //allow passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user))
  passport.deserializeUser((obj, cb) => cb(null, obj))

  //the function that is called when an OAuth provider sends back user
//information. Normally, you would save the user to the database here
//in a callback that was customized for each provider

// What is a little unusual is that the callback on line 21 
// is the same for all the OAuth providers. Normally that callback 
// is where you would save the user to a database and would need to be 
// configured for every provider individually.

// the callback is intentionally generic, but we will save huser data here.
const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile)

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      m.User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
  passport.use(
    new DiscogsStrategy(DISCOGS_CONFIG, 
      callback//save user data here
      )
  );
};
