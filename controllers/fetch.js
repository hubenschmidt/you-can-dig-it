const model = require('../models');
const axios = require('axios');
const Discogs = require('disconnect').Client;
var db = new Discogs().database();
var random = Math.floor((Math.random() * 9999999) + 1);

// const fetch = require('../scripts/fetchdatabase')

//define controller Methods
module.exports = {
    fetchDatabase: function (req, res) {
        //hit discogs Database API
        db.getRelease(6547829, function (err, data) {
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
            
        })
            .then(function (data) {
                console.log(data)
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
    }
    // ,
    //fetchUser: function (req, res)
}

console.log(module.exports.fetchDatabase())


