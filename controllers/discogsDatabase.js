const m = require('../models');
const axios = require('axios');
const mongoose = require('mongoose')
const Discogs = require('disconnect').Client;
const db = new Discogs().database();
var random = Math.floor((Math.random() * 9999999) + 1);
// var id = "919"

const server = require('../server.js')

//Define methods for API calls to Discogs Database
// module.exports = {
//     findById: findById,
//     findAll: findAll
// }



// exports.findAll = function(req, res){
//     //check mongoDB for all Releases
//     m.Database
//     // .find()
//     .find(req.query)
//     .sort({ year: -1 })
//     .then(function(dbModel){
//         res.json(dbModel)
//         console.log(dbModel)  
//     }) 
//     .catch(err => 
//         res.status(422).json(err))
//     }

function findAll(req, res){
    //check mongoDB for all Releases
    m.Database
        .find()
        // .find(req.query)
        // .sort({ year: -1 })
        .then(function(dbModel){
            console.log(dbModel)
            // res.json(dbModel)  
        }) 
        .catch(err => 
            console.log(err) || res.status(422).json(err))
}

//find and create Release by Id
// function findById(db, id, req, res){
//     //check mongoDB first
//     m.Database.countDocuments({id_discogs: id || req.params.id}, function(err, count){
//         if(count>0){
//             console.log('Release exists in MongoDB; no API call was made to Discogs Database')
//         } else {
//             // hit discogs Database API
//             db.getRelease(id || req.params.id)
//                 .then(function(release){
//                     let format = formatResponse(release)
//                     m.Database.create(format)
//                         .then(function(newRelease){
//                             console.log('new Release created in Database!', newRelease)
//                             res.json(newRelease)
//                     }) 
//                 }).catch(function(err){
//                     console.log(err)
//                 })
//         }
//     }) 
// }

function formatResponse (data) {
            releases = []
            var releasesToAdd = {
                id_discogs: parseInt(id),
                artist: data.artists_sort,
                title: data.title,
                labels: data.labels,
                year: data.year,
                country: data.country,
                genres: data.genres,
                styles: data.styles,
                tracklist: data.tracklist,
                uri: data.uri,
                lowest_price: data.lowest_price,
            };
            releases.push(releasesToAdd)
            return releases
        }


//testing
// console.log(
//     findById(db, id)
// )

console.log(findAll())
// console.log(server)
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