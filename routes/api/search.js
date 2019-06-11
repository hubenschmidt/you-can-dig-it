const router = require('express').Router();
const discogsDatabase = require('../../controllers/discogsDatabase');

//Matches with "/api/search/"

//https://www.discogs.com/developers/#page:database,header:database-search
router
    .route('/?q={query}&{?type,title,release_title,credit,artist,anv,label,genre,style,country,year,format,catno,barcode,track,submitter,contributor}')
    .post(discogsDatabase.searchReleases)   

module.exports = router;
