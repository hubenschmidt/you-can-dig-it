const m = require('../models');
// const axios = require('axios');
// const mongoose = require('mongoose')

//check to see if the disconnect dependencies are required elsewhere with create and findById methods
const Discogs = require('disconnect').Client;
const db = new Discogs().database();

//Export methods
module.exports = {
    findAll: findAll,
    findById: findById,
    create: create,
    randomRelease: randomRelease,
    searchReleases: searchReleases,
    getLibrary: getLibrary,
    syncUserReleases: syncUserReleases,
    serveUserReleases: serveUserReleases
}

//Define methods for API calls to Discogs Database===================================================

//check mongoDB for all Releases
function findAll(req, res) {
    m.Release
        .find(req.query)
        .sort({ year: -1 })
        .then(dbModel => res.json(dbModel))
        .then(dbModel => console.log(dbModel))
        .catch(err => res.status(422).json(err))
};

//search for subset of documents in to load library
function getLibrary(req, res) {
    m.Release
        .find(req.query)
        .select({ year: 1, title: 1, genres: 1, images: 1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
}



//find by Release Id
function findById(req, res) {
    m.Release
        .findById(req.params._id)
        .then(dbModel => res.json(dbModel))
        .then(dbModel => console.log(dbModel))
        .catch(err => res.status(422).json(err));
};

//create Release by Id
function create(req, res) {
    // check mongoDB for existing doc
    m.Release.countDocuments({ id_release: req.params.id_release }, function (err, count) {
        if (count > 0) {
            console.log('doc exists')
        } else if (!count) {
            console.log('doc does not exist')
            // hit discogs Database API
            db.getRelease(req.params.id_release)
                .then(function (release) {
                    let format = formatResponse(release)
                    //create in mongoDb
                    m.Release.create(format)
                        .then(dbModel => res.json(dbModel))
                        .then(dbModel => console.log(dbModel))
                        .catch(err => res.status(422).json(err));
                })
        }
    })
};

//get random Release from Discogs API
function randomRelease(req, res) {
    id_random = Math.floor((Math.random() * 9999999) + 1);
    db.getRelease(id_random, function (err, response) {
        if (err) {
            if (err.statusCode === 404) {
                console.log(err.statusCode)
                return randomRelease(req, res)
            } else if (err.statusCode === 429) {
                console.log(err.statusCode)
                //if status code '429: too many requests', wait 60 seconds
                setTimeout(function () { randomRelease(req, res) }, 60000)
            }
        } else {
            let format = formatResponse(response)
            m.Release.create(format)
                .then(dbModel => res.json(dbModel))
                .then(dbModel => console.log(dbModel))
                .catch(err => res.status(422).json(err));
        }
    })
}

//hard coded accessData for dev use in identity()..store this in mongoDB
var accessDataObj = {
    method: 'oauth',
    level: 0,
    consumerKey: 'ucyQbMxfuVNEigpgyQrp',
    consumerSecret: 'hJkdzVOPODpOErIWzhkKgUeBJDQlqAEt',
    token: 'HbfWYiIndiXviDFOCAQdaGZJfCCXTMMUobCjkKVI',
    tokenSecret: 'ZEnTKLhXQlLIYFeRVnPkdkiFAqpxfqybUzXYsBrI',
    authorizeUrl: 'https://www.discogs.com/oauth/authorize?oauth_token=HbfWYiIndiXviDFOCAQdaGZJfCCXTMMUobCjkKVI'
}
var getUserData = async (id) => {
    return new Promise((resolve, reject) => {
        m.User.findById(id, function (err, doc) {
            if (err) reject(err);
            resolve(doc ? doc.toJSON() : undefined);
        });
    });
}

var getUserCollection = async (userId) => {
    var userData = await getUserData(userId);
    var accessData = userData.discogsAccessData;
    var col = new Discogs(accessData).user().collection();
    return new Promise((resolve, reject) => {
        try {


            col.getReleases(userData.discogsUserData.username, 0, { page: 1, per_page: 256 }, function (err, data) {
                if (err) reject(err);
                resolve(data ? data.releases : null);
            })
        } catch (e) {
            reject(e);
        }
    });
}

var dbFindOneByReleaseId = async(releaseId) => {
    return new Promise((resolve, reject) => {
        m.Release.findOne({id: releaseId}, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
    
}

async function serveUserReleases(req, res) {
    var userId = req.params._id;
    var retVal = await getUserCollection(userId);
    res.json(retVal);
}

async function syncUserReleases(req, res)  {
    var userId = req.params._id;
    var releases = await getUserCollection(userId);
    releases.releases.forEach(async (release) => {
        var releaseId = release.id;
        var existing = await dbFindOneByReleaseId(releaseId);
        if (existing) {
            existing = existing.toJSON();
            if (existing.userIds) {
                if (existing.userIds.indexOf(userId) >= 0)
                {
                    existing.userIds.push(userId);
                }
            }
            else existing.userIds = [userId];
            m.Release.findOneAndUpdate({_id: existing._id}, {})
        } else {
            const dbRel = formatResponse(release);
            dbRel[0].userIds = [userId];  // TODO: need to reformat the response so it's appropriate to our db schema
            m.Release.create(dbRel).then((data) => {
                console.log(data);
            });
        }
    });
}

//search query (must authenticate)
function searchReleases(req, res, param) {
    db.search(req.query, param, function (err, release) {
        if (err) {
            //AuthError: You must authenticate to access search
            console.log(err + "search error")
        } else {
            let format = formatResponse(release)
            m.Release.create(format)
                .then(function (newRandom) {
                    console.log('new random Release created in database!', newRandom)
                    res.json(newRandom)
                }).catch(function (err) {
                    console.log(err)
                })
        };
    })
};


//util
function formatResponse(data) {
    console.log(data.id)
    releases = []
    var releasesToAdd = {
        id_release: parseInt(data.id),
        artist: data.artists_sort,
        title: data.title,
        labels: data.labels,
        year: data.year,
        country: data.country,
        genres: data.genres,
        styles: data.styles,
        tracklist: data.tracklist,
        uri: data.uri,
        videos: data.videos,
        images: data.images,
        lowest_price: data.lowest_price,
        wantlist: false,
        hide: false,
    };
    releases.push(releasesToAdd)
    return releases
}