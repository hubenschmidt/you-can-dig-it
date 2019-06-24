const router = require('express').Router();
const discogs = require('./discogs');

router.use('/discogs', discogs);


module.exports = router