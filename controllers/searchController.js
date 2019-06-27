const m = require('../models');
const Discogs = require('disconnect').Client;
let discogs_uid;


module.exports = {
    searchAll: searchAll
}

function searchAll(req, res) {
    // console.log(req.user)
    // console.log(req._passport.instance)
    // console.log(req.query.q)
    discogs_uid = req.user._json.id 
    m.User.findOne({ "discogsUserData.id": discogs_uid }).lean()
        .then(doc =>
             db = new Discogs(doc.discogsAccessData).database())
            .then(accessDb =>{
                //req.query here
                //show me release objects that contain "Kruder"
                // accessDb.search("Kruder",{type:"release", page:1, per_page:1}))
                //https://localhost:5000/api/search?q=nirvana&type=release
                //https://localhost:5000/api/search?q=butthole%20surfers&type=release
                console.log(req.query.q);
                accessDb.search(req.query.q,{type: "release" , page:1, per_page:10})
                // accessDb.search("Kruder",{type:"release", page:1, per_page:20}))
                    .then(results => res.json(results))
                    .catch(err=>res.status(422).json(err))});
};
