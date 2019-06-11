const app = require('express')
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

function authorize(res, req){
    var oAuth = new Discogs().oauth();
    oAuth.getRequestToken(
        'ucyQbMxfuVNEigpgyQrp', // 'YOUR_CONSUMER_KEY',
        'hJkdzVOPODpOErIWzhkKgUeBJDQlqAEt', // 'YOUR_CONSUMER_SECRET',
        'http://your-script-url/callback',
        function(err, requestData){
            //persist 'requestData' here so that the callback handler
            //can access it later after returning from the authorize url
            // res.redirect(requestData.authorizeUrl);
            // res.json(requestData)
            console.log(requestData)
            // console.log(requestData.authorizeUrl)
            // res.redirect('callbackhell.com')
            // // res.redirect("'"+requestData.authorizeUrl+"'")
            // console.log('auth callback on GET /authorize success!'.cyan)
            // return requestData.authorizeUrl
            // res.json(requestData)
        }
    );
};