const router = require('express').Router();
const authController = require('../../controllers/authController');

//Matches with "/api/logout"
router
    .route('/')
    .get(authController.logout)

module.exports = router;