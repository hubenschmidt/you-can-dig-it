const router = require('express').Router();
const searchController = require('../../controllers/searchController');

//Matches with "/api/search/"
//https://www.discogs.com/developers/#page:database,header:database-search
router
    .route('/')
    .get(searchController.searchAll)   

module.exports = router;