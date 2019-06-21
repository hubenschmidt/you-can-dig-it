const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// //model needs to be fixed to just be discogsData
// const { providers } = require('../config/oauth.providers')

// console.log('console logging providers from user model', providers)

// //
// const providerFields = providers.reduce((obj, provider) => {
//   obj[provider] = {
//     name: {
//       type: String
//     },
//     // photo: {
//     //   type: String
//     // }
//   }
//   return obj
// }, {})

// //data we need to colect/confirm to integrate discogs OAuth 
// const oauthFields = {
//   email: {
//     type: String,
//     unique: true
//   },
//   ...providerFields
// }

const UserSchema = new Schema({
  // oauthFields,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
