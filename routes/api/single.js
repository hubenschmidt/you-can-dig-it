const router = require('express').Router();
const fetch = require('../../controllers/fetch');

router.get('/', fetch.fetchDatabase)

module.exports = router;
