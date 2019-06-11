const router = require('express').Router();
const discogsAuth = require('../../controllers/discogsAuth.js');
const colors = require('colors')
const Discogs = require('disconnect').Client;

//Matches with "/authorize"
router
    .route('/')
    .get(function(req,res){
        var oAuth = new Discogs().oauth();
        oAuth.getRequestToken(
            'ucyQbMxfuVNEigpgyQrp', // 'YOUR_CONSUMER_KEY',
            'hJkdzVOPODpOErIWzhkKgUeBJDQlqAEt', // 'YOUR_CONSUMER_SECRET',
            'http://your-script-url/callback',
            function(err, requestData){
                //persist 'requestData' here so that the callback handler
                //can access it later after returning from the authorize url
        
                res.redirect(requestData.authorizeUrl)
                // console.log(requestData.authorizeUrl)
                // res.redirect('callbackhell.com')
                // // res.redirect("'"+requestData.authorizeUrl+"'")
                // console.log('auth callback on GET /authorize success!'.cyan)
                // return requestData.authorizeUrl
                // res.json(requestData)
            }
        );

    })
    // .get(discogsAuth.authorize)
 
    


module.exports = router;
