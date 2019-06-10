const m = require('../models');
const axios = require('axios');
const mongoose = require('mongoose')
var sinon = require('sinon')



//check to see if the disconnect dependencies are required elsewhere with create and findById methods
const Discogs = require('disconnect').Client;
const db = new Discogs().database();
// var id_random = ''
// var id = 22

//unit testing
// const server = require('../server.js')
// function mockRequest(){
//     var _id = 1233225
//     var id_release = 9039
    
//     var req = {
//         params: {
//             _id: _id,
//             id_release: id_release
//             }
//                 }
//     return req
// }

// console.log(
//     create(mockRequest())
//     )

//     console.log(
//     findById(mockRequest())
//     )

// console.log(req.params)
// console.log(
//     findById(id)
// )
// console.log(
//     create(db, id)
// )

//Export methods
module.exports = {
    findAll: findAll,
    findById: findById,
    create: create,
    randomRelease: randomRelease,
}

//Define methods for API calls to Discogs Database===================================================

function findAll(req, res){
    //check mongoDB for all Releases
    m.Release
    // .find()
    .find(req.query)
    .sort({ year: -1 })
    .then(function(dbModel){
        res.json(dbModel)
    }) 
    .catch(err => res.status(422).json(err))
    }

//find by Release Id
function findById(req, res){
    m.Release
        .findById(req.params._id)
        .then(dbModel => res.json(dbModel, console.log(dbModel)))
        .catch(err => res.status(422).json(err));
};

//create Release by Id
function create(req, res){

    //check mongoDB first
    // m.Release.countDocuments(req.params.id_release, function(err, count){
    //     if(count>0){
    //         console.log('Release exists in MongoDB; no API call was made to Discogs Database')
    //     } else {
          
            // hit discogs Database API
            db.getRelease(req.params.id_release)
                .then(function(release){
                    console.log(release)
                    let format = formatResponse(release)
                    //then create in mongoDB
                    m.Release.create(format)
                        .then(function(newRelease){
                            console.log('new Release created in mongoDB!', newRelease)
                            //then display JSON
                            console.log(newRelease)
                            res.json(newRelease)
                    }) 
                }).catch(function(err){
                    console.log(err)
                })
    //     }
    // }) 
};

//Call Discogs API for random release
function randomRelease(db, req, res) {
    id_random = Math.floor((Math.random() * 9999999) + 1);
    
            db.getRelease(id_random || req.params.id_release)
                .then(function (err, release) {
                if (err) {
                    console.log(err + " unexpected error, reloading random release");
                    //fix this so it reloads==================================================
                    randomRelease()
                } else {
                    // let formatId_random = toString(id_random)
                    let format = formatResponse(release)
                    m.Release.create(format)
                        .then(function(newRandom){
                            console.log('new random Release created in database!', newRandom)
                            res.json(newRandom)
            })
        };
    })
}

function searchReleases (query, param) {
            db.search(query, param, function (err, release) {
                if (err) {
                    //AuthError: You must authenticate to access search
                    console.log(err + "search error")
                } else {
                    let format = formatResponse(release)
                    m.Release.create(format)
                        .then(function(newRandom){
                            console.log('new random Release created in database!', newRandom)
                            res.json(newRandom)
                        }).catch(function(err){
                            console.log(err)
                })
        };
    })
};


//util
function formatResponse (data) {
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


// module.exports = {
    
//     fetchDatabase: function (id, random, req, res) {
//         // hit discogs Database API
//         return getOneRelease(id)

//             .then(function (data) {
//                 //then insert results into db 
//                 return model.Database.create(data);
//             })
//             .then(function (modelDatabase) {
//                 if (modelDatabase.length === 0) {
//                     res.json({
//                         message: 'No new Database items to fetch today. Check back tomorrow.'
//                     });
//                 }
//                 else {
//                     //otherwise send back a count of how many new releases we got
//                     res.json({
//                         message: 'Fetched ' + modelDatabase.length + 'new Database items!'
//                     });
//                 }
//             })
//             .catch(function (err) {
//                 //This query won't insert data with duplicate data (test this)
//                 res.json({
//                     message: 'Database fetch complete.'
//                 });
//             });
//     },
//     getOneRelease: function (id) {
//         db.getRelease(id, function (err, data) {
//             console.log(formatResponse(data))
//         })
//     },

//     getRandomRelease: function (id_random) {
//         db.getRelease(id_random, function (err, data) {
//             if (err) {
//                 console.log(err + " unexpected error, reloading random release")
//                 return getOneRelease
//             } else {
//                 formatResponse(data)
//             }
//         })
//     },

//     searchReleases: function (query, param) {
//         db.search(query, param, function (err, data) {
//             if (err) {
//                 //AuthError: You must authenticate to access search
//                 console.log(err + "search error")
//             } else {
//                 formatResponse(data)
//             }
//         })
//     },

//     formatResponse: function (data) {
//         releases = []

//         var releasesToAdd = {
//             artist: data.artists_sort,
//             title: data.title,
//             labels: data.labels,
//             year: data.year,
//             country: data.country,
//             genres: data.genres,
//             styles: data.styles,
//             tracklist: data.tracklist,
//             uri: data.uri,
//             lowest_price: data.lowest_price,
//         };
//         releases.push(releasesToAdd)
//         return releases
//     }

//     // ,
//     // fetchUser: function (req, res)
// }