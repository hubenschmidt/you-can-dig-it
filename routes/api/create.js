const router = require('express').Router();
const discogsDatabase = require('../../controllers/discogsDatabase');

//Matches with '/api/create/:id_release'
router
    .route('/:id_release')
    .post(discogsDatabase.create);

module.exports = router;