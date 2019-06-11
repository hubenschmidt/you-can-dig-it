const router = require('express').Router();
const discogsDatabase = require('../../controllers/discogsDatabase');

//Matches with "/api/create/:id_release"
router
    .route('/:id_release')
    // .get(discogsDatabase.findAll)
    .post(discogsDatabase.create)   

module.exports = router;
