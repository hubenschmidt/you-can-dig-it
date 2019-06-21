const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { providers } = require('../config/oauth.providers')
const colors = require('colors')

console.log(require('../config/oauth.providers'))

exports.discogs = (req, res) => {

    const io = req.app.get('io')
    const user = {
      name: req.user.username,
    }

    io.in(req.session.socketId).emit('discogs', user)
    res.end()  
}
