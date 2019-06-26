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
        .find(
            {userIds: {$elemMatch: {$eq: req.params._id}}}
            )
        .select({ year: 1, title: 1, genres: 1, image: 1 })
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
// var accessDataObj = {
//     method: 'oauth',
//     level: 0,
//     consumerKey: 'ucyQbMxfuVNEigpgyQrp',
//     consumerSecret: 'hJkdzVOPODpOErIWzhkKgUeBJDQlqAEt',
//     token: 'HbfWYiIndiXviDFOCAQdaGZJfCCXTMMUobCjkKVI',
//     tokenSecret: 'ZEnTKLhXQlLIYFeRVnPkdkiFAqpxfqybUzXYsBrI',
//     authorizeUrl: 'https://www.discogs.com/oauth/authorize?oauth_token=HbfWYiIndiXviDFOCAQdaGZJfCCXTMMUobCjkKVI'
// }
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

var getTracklist = async (releaseId) => {
    return new Promise((resolve, reject) => {
        db.getRelease(releaseId, (err, data) => {
            if (err) reject(err);
            resolve(data ? data.tracklist : null);
        })
    });
}

var dbFindOneByReleaseId = async(releaseId) => {
    return new Promise((resolve, reject) => {
        m.Release.findOne({id_release: releaseId}, (err, data) => {
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

async function asyncForEach(array, callback) {
    if (!array) return;
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

async function createReleasePromise(release)
{
    return new Promise(async (resolve, reject) => {
        var tracklist = await getTracklist(release[0].id_release);
        release[0].tracklist = tracklist;
        m.Release.create(release).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

async function findOneAndUpdatePromise(conditions, update)
{
    return new Promise((resolve, reject) => {
        m.Release.findOneAndUpdate(conditions, update).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

async function syncUserReleases(req, res)  {
    var userId = req.params._id;
    var releases = await getUserCollection(userId);
    await asyncForEach(releases, async (release) => {
        var releaseId = release.id;
        var existing = await dbFindOneByReleaseId(releaseId);
        if (existing) {
            existing = existing.toJSON();
            var update = false;
            if (existing.userIds) {
                existing.userIds = existing.userIds.map(uid => uid.toString());
                if (existing.userIds.indexOf(userId) == -1)
                {
                    existing.userIds.push(userId);
                    update = true;
                }
            }
            else {
                existing.userIds = [userId];
                update = true;
            }
            if (update) await findOneAndUpdatePromise({_id: existing._id},{userIds: existing.userIds});
        } else {
            const dbRel = formatResponse(release);
            dbRel[0].userIds = [userId]; 
            await createReleasePromise(dbRel);
        }
    });
    res.json(releases);
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
// function formatResponse(data) {
//     console.log(data.id)
//     releases = []
//     var releasesToAdd = {
//         id_release: parseInt(data.id),
//         artist: data.artists_sort,
//         title: data.title,
//         labels: data.labels,
//         year: data.year,
//         country: data.country,
//         genres: data.genres,
//         styles: data.styles,
//         tracklist: data.tracklist,
//         uri: data.uri,
//         videos: data.videos,
//         images: data.images,
//         lowest_price: data.lowest_price,
//         wantlist: false,
//         hide: false,
//     };
//     releases.push(releasesToAdd)
//     return releases
// }

function formatResponse(data){
    var releaseToAdd ={
        id_release: data.id,
        title: data.basic_information.title,
        uri: data.basic_information.master_url,
        image: data.basic_information.cover_image,
        year: data.basic_information.year,
        artist: data.basic_information.artists.map(a => a.name).join(','),
        tracklist: data.tracklist
    };
    return [releaseToAdd];
}