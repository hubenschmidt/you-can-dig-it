const router = require('express').Router();
const fetch = require('../../controllers/fetch');

router.get('/', fetch.getRandomRelease)

module.exports = router;
