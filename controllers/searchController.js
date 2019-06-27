const m = require('../models');
const Discogs = require('disconnect').Client;
let discogs_uid;


module.exports = {
    searchAll: searchAll,
    create: create
}

function searchAll(req, res) {
    // console.log(req.user)
    // console.log(req._passport.instance)
    // console.log(req.query.q)
    discogs_uid = req.user._json.id 
    m.User.findOne({ "discogsUserData.id": discogs_uid }).lean()
        .then(doc =>
             db = new Discogs(doc.discogsAccessData).database())
            .then(accessDb =>
                //req.query here
                //show me release objects that contain "Kruder"
                // accessDb.search("Kruder",{type:"release", page:1, per_page:1}))
                //https://localhost:5000/api/search?q=nirvana&type=release
                //https://localhost:5000/api/search?q=sound%garden&type=release
                // accessDb.search(req.query.q,{type:req.query.type, page:1, per_page:10}))
                accessDb.search(req.query.q,{type:"release", page:1, per_page:10}))
                // accessDb.search("Kruder",{type:"release", page:1, per_page:20}))
                    .then(results => res.json(results))
                    .catch(err=>res.status(422).json(err))
};

function create(req, res){
    // console.log(req.body, 'create on search controller')
    const release = {
        // id_release: parseInt(req.body.id_release),
        id_release: req.body.id,
        title: req.body.title,
        labels: req.body.label,
        year: req.body.year,
        country: req.body.country,
        genres: req.body.genre,
        styles: req.body.style,
        thumb: req.body.thumb,
        cover_image: req.body.cover_image,
        resource_url: req.body.resource_url,
        master_url: req.body.master_url,
        uri: req.body.uri,
        user_data: req.body.user_data,
    };
    console.log(release, 'formatted object to persist to database')
    m.Release
        .create(release)
        .then(dbRelease => console.log(dbRelease))
        .then(dbRelease => res.json(dbRelease))
        .catch(err => res.status(422).json(err))
}

