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
const axios = require('axios')

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
//for local user authentication ========================

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log('jwt_payload',jwt_payload.id)
      User.findById(jwt_payload.id)
        .then(user => {
          userInfo = user;
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

    let discogsUserData = user._json

    let discogsAccessData = {
      method: 'oauth',
      level: 0,
      consumerKey: process.env.DISCOGS_KEY,
      consumerSecret: process.env.DISCOGS_SECRET,
      token: token,
      tokenSecret: tokenSecret,
      authorizeUrl: `https://www.discogs.com/oauth/authorize?oauth_token=${token}`
    }
    
    console.log(discogsAccessData)
    //use userInfo here
    // User.create(discogsUserData)

    done(null, user)
  }

const currentUser = async () => {
  try {
    return await axios.get('/api/users/login')
    
  } catch (error) {
    console.error(error)
  }
}


  
  // Adding Discogs OAuth provider datato passport
  passport.use(new DiscogsStrategy(DISCOGS_CONFIG, callback))


};
