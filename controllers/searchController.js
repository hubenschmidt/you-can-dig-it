const m = require('../models');
const Discogs = require('disconnect').Client;
let discogs_uid;


module.exports = {
    searchReleases: searchReleases
}

    /**
     * Search the database
     * @param {string} query - The search query
     * @param {object} [params] - Search parameters as defined on http://www.discogs.com/developers/#page:database,header:database-search
     * @param {function} [callback] - Callback function
     * @return {DiscogsClient|Promise}
     */

    // /database/search?q={query}&{?type,title,release_title,credit,artist,anv,label,genre,style,country,year,format,catno,barcode,track,submitter,contributor}

function searchReleases(req, res) {
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
                //https://localhost:5000/api/search?q=butthole%20surfers&type=release
                accessDb.search(req.query.q,{type:req.query.type, page:1, per_page:20}))
                // accessDb.search("Kruder",{type:"release", page:1, per_page:20}))
                    .then(results => 
                        console.log('RESULTS START==================',results,'===============++++END')
                        )
};
