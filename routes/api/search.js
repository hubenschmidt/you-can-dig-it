const router = require('express').Router();
const fetch = require('../../controllers/fetch');

router.get('/', fetch.searchReleases)
console.log(fetch.searchReleases)

module.exports = router;
