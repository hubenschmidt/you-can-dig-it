const m = require('../models');
const colors = require('colors')
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
    getLibrary: getLibrary
}

//Define methods for API calls to Discogs Database===================================================

//check mongoDB for all Releases
function findAll(req, res) {
    m.Release
        .find(req.query)
        .sort({
            year: -1
        })
        .then(dbModel => res.json(dbModel))
        .then(dbModel => console.log(dbModel))
        .catch(err => res.status(422).json(err))
};

//search for subset of documents in to load library
function getLibrary(req, res) {
    m.Release
        .find(req.query)
        .select({
            year: 1,
            title: 1,
            genres: 1,
            images: 1
        })
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
    m.Release.countDocuments({
        id_release: req.params.id_release
    }, function (err, count) {
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
                setTimeout(function () {
                    randomRelease(req, res)
                }, 60000)
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
    level: 2,
    consumerKey: 'ucyQbMxfuVNEigpgyQrp',
    consumerSecret: 'hJkdzVOPODpOErIWzhkKgUeBJDQlqAEt',
    token: 'HbfWYiIndiXviDFOCAQdaGZJfCCXTMMUobCjkKVI',
    tokenSecret: 'ZEnTKLhXQlLIYFeRVnPkdkiFAqpxfqybUzXYsBrI',
    authorizeUrl: 'https://www.discogs.com/oauth/authorize?oauth_token=HbfWYiIndiXviDFOCAQdaGZJfCCXTMMUobCjkKVI'
}


// function getAllReleases(username) {
//     var col = new Discogs(accessDataObj).user().collection();

//     col.getReleases(username, 0, {
//             page: 15,
//             per_page: 100
//         },
//         function (err, data, rateLimit) {
//             console.log(data, rateLimit)
//         })

// // }
// console.log('logging userCollection', getAllReleases('hubenschmidt'))

    /**
     * Search the database
     * @param {string} query - The search query
     * @param {object} [params] - Search parameters as defined on http://www.discogs.com/developers/#page:database,header:database-search
     * @param {function} [callback] - Callback function
     * @return {DiscogsClient|Promise}
     */

//search query (must authenticate)
function searchReleases(req, res, token) {
    var db = new Discogs(token || accessDataObj).database()
    db.search(req || 'The Beatles the Rolling Stones', {page:1, per_page:1}, function(err, res, rateLimit){
        if (err){
            console.log(err)
        }
        // console.log(res.results[0].id)

    })

    // db.search(query, function (err, release) {
    //     if (err) {
    //         //AuthError: You must authenticate to access search
    //         console.log(err + "search error")
    //     } else {
    //         console.log(query)
    //         // let format = formatResponse(release)
    //         // m.Release.create(format)
    //         //     .then(function (newRandom) {
    //         //         console.log('new random Release created in database!', newRandom)
    //         //         res.json(newRandom)
    //         //     }).catch(function (err) {
    //         //         console.log(err)
    //         //     })
    //     };
    // })
};

searchReleases()


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