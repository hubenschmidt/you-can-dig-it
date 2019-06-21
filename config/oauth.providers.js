const { ExtractJwt } = require('passport-jwt')

const providers = ['discogs']

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === 'production'
    ? `/${provider}/callback`
    : `https://localhost:8080/${provider}/callback`
})

const [discogsURL] = callbacks

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
  ? '/'
  : ['https://127.0.0.1:3000', 'https://localhost:3000']

exports.DISCOGS_CONFIG = {
  consumerKey: process.env.DISCOGS_KEY,
  consumerSecret: process.env.DISCOGS_SECRET,
  callbackURL: discogsURL,
//   userProfileURL  : 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
  passReqToCallback: true
}

const JWT_SECRET = process.env.JWT_SECRET

exports.JWT_CONFIG = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: ['HS256']
}

// exports.DB_URL = process.env.NODE_ENV === 'production'
//   ? process.env.PRODUCTION_DB_URL
//   : 'mongodb://localhost/react-social-auth'

// exports.PORT = process.env.PORT || 5000

// exports.JWT_EXPIRY = process.env.JWT_EXPIRY