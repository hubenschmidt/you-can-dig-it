const router = require('express').Router();
const Discogs = require('disconnect').Client;
const colors = require('colors')

// var dis = new Discogs({userToken: 'YOUR_USER_TOKEN'})
var dis = new Discogs({
    consumerKey: 'YOUR_CONSUMER_KEY',
    consumerSecret: 'YOUR_CONSUMER_SECRET'
})

module.exports = {
    authorize: authorize
};

function authorize(req, res){
    var oAuth = new Discogs().oauth();
    oAuth.getRequestToken(
        'ucyQbMxfuVNEigpgyQrp', // 'YOUR_CONSUMER_KEY',
        'hJkdzVOPODpOErIWzhkKgUeBJDQlqAEt', // 'YOUR_CONSUMER_SECRET',
        'http://localhost:3000/auth/callback', //callback URL ... will this hard coded URL work upon deployment??
        function(err, requestData){
            //persist 'requestData' here so that the callback handler
            //can access it later after returning from the authorize url
            res.redirect(requestData.authorizeUrl);
        }
    );
};