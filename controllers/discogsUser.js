const m = require('../models');
const Discogs = require('disconnect').Client;
const db = new Discogs().database();

//export
module.exports = {
    currentDiscogsUser: currentDiscogsUser
}

//define methods for currently authenticated local user=======================

        function currentDiscogsUser(req, res){
            console.log(req.user)
            res.json(req.user);
        }
    