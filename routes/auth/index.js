const router = require('express').Router();

// const authorize = require('./authorize');
// const callback = require('./callback');
// const identity = require('./identity');

router.use((req, res, next) => {
    req.session.socketId = req.query.socketId
    next()
  })
// router.use('/authorize', authorize);
// router.use('/callback', callback);
// router.use('/identity', identity);

module.exports = router