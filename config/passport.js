const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require('../models/User');
const keys = require("../config/keys");
const { DISCOGS_CONFIG, JWT_CONFIG } = require('./oauth.providers')
const passport = require('passport')
const { Strategy: DiscogsStrategy } = require('passport-discogs')
const normalizeProfileData = require('./normalize.profile.data')


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
  // information. Normally, you would save the user to the database 
  // in this callback and it would be customized for each provider


  const oAuthCallback = async (req, accessToken, refreshToken, profile, cb) => {
    const io = req.app.get('io')
    
    let email 
    if(profile.emails) {
      email = profile.emails[0].value
    }
    const { provider } = profile

    // need to know the email address of the current user
    if(!email) {
      const capitalize = provider[0].toUpperCase() + provider.slice(1)
      const msg = `This ${capitalize} account does not have an email address so it can't be linked`
      return io.in(req.session.socketId).emit(`${provider}-error`, msg)
    }

    if (!req.session.sessionEmail) {
      req.session.sessionEmail = email
    }

    if (req.session.sessionEmail !== email) {
      const { sessionEmail } = req.session
      const msg = `${email} does not match the email used for this account: ${sessionEmail}`
      return io.in(req.session.socketId).emit(`${provider}-error`, msg)
    }

    const update = {
      [provider]: normalizeProfileData(profile)
    }

    User.findOneAndUpdate({email}, {$set: update}, {upsert: true, new: true})
      .then(user => cb(null, user)) 
  }

  const jwtCallback = (payload, cb) => {
    User.findOne(payload.email)
      .then(user => cb(null, user))
  }

  

  // Adding each OAuth provider and JWT strategies to passport
  passport.use(new DiscogsStrategy(DISCOGS_CONFIG, oAuthCallback))
  passport.use(new JwtStrategy(JWT_CONFIG, jwtCallback))


};
