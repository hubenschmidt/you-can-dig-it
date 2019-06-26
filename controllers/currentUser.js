const m = require('../models');
const Discogs = require('disconnect').Client;
const db = new Discogs().database();

//export
module.exports = {
    currentUser: currentUser
}

//define methods for currently authenticated local user=======================

function currentUser(req, res){
    m.User.findOne({ "discogsUserData.username": req.user.id}, function(err, doc){
        // console.log(doc.discogsUserData);
        //  res.json(doc);
        return doc
    })
 }
