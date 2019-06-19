const providers = ['discogs']

// let isDev = process.env.NODE_ENV !== 'production';
// let url = isDev ? '/' : 'http://localhost:5000'

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === 'production'
    ? `/${provider}/callback`
    : `https://localhost:5000/${provider}/callback`
})

const [discogsURL] = callbacks

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
  ? '/'
  : ['https://127.0.0.1:3000', 'https://localhost:3000']

exports.DISCOGS_CONFIG = {
  consumerKey: process.env.DISCOGS_KEY,
  consumerSecret: process.env.DISCOGS_SECRET,
  callbackURL: discogsURL,
}

// exports.GOOGLE_CONFIG = {
//   clientID: process.env.GOOGLE_KEY,
//   clientSecret: process.env.GOOGLE_SECRET,
//   callbackURL: googleURL
// }

// exports.FACEBOOK_CONFIG = {
//   clientID: process.env.FACEBOOK_KEY,
//   clientSecret: process.env.FACEBOOK_SECRET,
//   profileFields: ['id', 'emails', 'name', 'picture.width(250)'],
//   callbackURL: facebookURL
// }

// exports.GITHUB_CONFIG = {
//   clientID: process.env.GITHUB_KEY,
//   clientSecret: process.env.GITHUB_SECRET,
//   callbackURL: githubURL
// }