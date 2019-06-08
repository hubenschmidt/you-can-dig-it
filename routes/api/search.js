const router = require('express').Router();
const fetch = require('../../controllers/fetch');

router.get('/', fetch.searchReleases)
console.log(fetch)

module.exports = router;
