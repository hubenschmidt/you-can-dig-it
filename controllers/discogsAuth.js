const Discogs = require('disconnect').Client;

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
            // console.log(requestData)
            console.log('auth function working')
            console.log(oAuth)
        }
    );
};