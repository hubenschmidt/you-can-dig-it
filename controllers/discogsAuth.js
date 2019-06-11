const Discogs = require('disconnect').Client;
const colors = require('colors')

// var dis = new Discogs({userToken: 'YOUR_USER_TOKEN'})
var dis = new Discogs({
    consumerKey: 'YOUR_CONSUMER_KEY',
    consumerSecret: 'YOUR_CONSUMER_SECRET'
})

module.exports = {
    authorize: authorize,
    callback: callback,
    identity: identity
};

// console.log(authorize())
function authorize(req, res){
    var oAuth = new Discogs().oauth();
    oAuth.getRequestToken(
        'ucyQbMxfuVNEigpgyQrp', // 'YOUR_CONSUMER_KEY',
        'hJkdzVOPODpOErIWzhkKgUeBJDQlqAEt', // 'YOUR_CONSUMER_SECRET',
        'http://localhost:3000/auth/callback', //callback URL ... will this hard coded URL work upon deployment??
        function(err, requestData){
            //persist 'requestData' here so that the callback handler.... store in mongoDB
            //can access it later after returning from the authorizeUrl
            res.redirect(requestData.authorizeUrl);
            // return requestData
        }    
    );
};

// hard coded requestData for dev use in callback()..store this in mongoDB
var requestDataObj = {
    method: 'oauth',
    level: 0,
    consumerKey: 'ucyQbMxfuVNEigpgyQrp',
    consumerSecret: 'hJkdzVOPODpOErIWzhkKgUeBJDQlqAEt',
    token: 'GDIdrtYhPgMkdLOAynyrjoCneMmUwQzAjjiewPxk',
    tokenSecret: 'BaThKoKXyMLMCTHWgAyoWzbTLHfQsZSVNFCPkWOJ',
    authorizeUrl: 'https://www.discogs.com/oauth/authorize?oauth_token=GDIdrtYhPgMkdLOAynyrjoCneMmUwQzAjjiewPxk'
}


function callback(req, res){
    var oAuth = new Discogs(requestDataObj).oauth(); //
    oAuth.getAccessToken(
        req.query.oauth_verifier, //verification code sent back by Discogs
        function(err, accessData){
            // console.log('log access data'.cyan)
            // console.log(accessData)
            //Persist 'accessData' here for following OAuth calls... store in mongoDB 
            res.send("Received access token!");
        }
    )
}

//hard coded accessData for dev use in identity()..store this in mongoDB
var accessDataObj = {
    method: 'oauth',
    level: 0,
    consumerKey: 'ucyQbMxfuVNEigpgyQrp',
    consumerSecret: 'hJkdzVOPODpOErIWzhkKgUeBJDQlqAEt',
    token: 'GDIdrtYhPgMkdLOAynyrjoCneMmUwQzAjjiewPxk',
    tokenSecret: 'BaThKoKXyMLMCTHWgAyoWzbTLHfQsZSVNFCPkWOJ',
    authorizeUrl: 'https://www.discogs.com/oauth/authorize?oauth_token=GDIdrtYhPgMkdLOAynyrjoCneMmUwQzAjjiewPxk'
  }

function identity(req, res){
    var dis = new Discogs(accessDataObj);
    dis.getIdentity(function(err,data){
        console.log(data)
        res.send(data)
    })
}