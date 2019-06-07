'use strict';

const axios = require('axios');
const Discogs = require('disconnect').Client;
var releases
var id = ""
var id_random = Math.floor((Math.random() * 9999999) + 1);
var db = new Discogs().database();

//controller Methods powered by disconnect
module.exports = {
    getOneRelease: db.getRelease(id, function (err, data) {
        formatResponse(data)
    }),
    getRandomRelease: db.getRelease(id_random, function (err, data) {
        if (err) {
            console.log(err + " unexpected error, reloading random release")
            return getOneRelease
        } else {
            formatResponse(data)
        }
    }),

    searchReleases: db.search('hello stranger', 'track', function (err, data) {
        if (err){
             //AuthError: You must authenticate to access search
            console.log(err + "search error")
        } else {
            formatResponse(data)
        }
    })
}

// console.log(module.exports)

//format response
function formatResponse(data) {
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
