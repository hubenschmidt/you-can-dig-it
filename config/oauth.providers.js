exports.providers = ['discogs']

const callbacks = this.providers.map(provider => {
  return process.env.NODE_ENV === 'production'
    ? `/${provider}/callback`
    : `https://localhost:5000/auth/${provider}/callback`
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

exports.DB_URL = process.env.NODE_ENV === 'production'
  ? process.env.PRODUCTION_DB_URL
  : 'mongodb://localhost/YouCanDigIt'

exports.PORT = process.env.PORT || 5000

exports.JWT_EXPIRY = process.env.JWT_EXPIRY