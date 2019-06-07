const model = require('../models');
const axios = require('axios');
const Discogs = require('disconnect').Client;
var db = new Discogs().database();
var random = Math.floor((Math.random() * 9999999) + 1);
var id = ""
// var fetch = require('../scripts/fetchdatabase')


//controller Methods==========================================
module.exports = {
    fetchDatabase: function (req, res) {
        // hit discogs Database API
        return getOneRelease(id)
            .then(function (data) {
                // console.log(data)
                //then insert results into db 
                return model.Database.create(data);
            })
            .then(function (modelDatabase) {
                if (modelDatabase.length === 0) {
                    res.json({
                        message: 'No new Database items to fetch today. Check back tomorrow.'
                    });
                }
                else {
                    //otherwise send back a count of how many new releases we got
                    res.json({
                        message: 'Fetched ' + modelDatabase.length + 'new Database items!'
                    });
                }
            })
            .catch(function (err) {
                //This query won't insert data with duplicate data (test this)
                res.json({
                    message: 'Database fetch complete.'
                });
            });
    },
    getOneRelease: function (id) {
        db.getRelease(id, function (err, data) {
            console.log(formatResponse(data))
        })
    },

    getRandomRelease: function (id_random) {
        db.getRelease(id_random, function (err, data) {
            if (err) {
                console.log(err + " unexpected error, reloading random release")
                return getOneRelease
            } else {
                formatResponse(data)
            }
        })
    },

    searchReleases: function (query, param) {
        db.search(query, param, function (err, data) {
            if (err) {
                //AuthError: You must authenticate to access search
                console.log(err + "search error")
            } else {
                formatResponse(data)
            }
        })
    },

    formatResponse: function (data) {
        releases = []

        var releasesToAdd = {
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

    // ,
    // fetchUser: function (req, res)
}



