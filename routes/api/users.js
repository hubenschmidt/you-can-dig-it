const router = require('express').Router();
const localAuth = require('../../controllers/localAuth');

// @route POST api/users/register
// @desc Register user
// @access Public
router
    .route('/register')
    .post(localAuth.register);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router
    .route('/login')
    .post(localAuth.login);

module.exports = router;