const router = require('express').Router();
const authController = require('../../controllers/authController');

//Matches with "/api/unlink"
router
    .route('/')
    .get(authController.unlink)

module.exports = router;