const router = require('express').Router();
const auth = require('./auth');

router.use('/authorize', auth);

module.exports = router