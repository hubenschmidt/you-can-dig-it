const router = require('express').Router();
const discogsDatabase = require('../../controllers/discogsDatabase');

//Matches with "/api/database"
    router
        .route('/')
        .get(discogsDatabase.findAll)
    
//Matches with "/api/database/:id"
router
    // .route('/:id')
    // .get(discogsDatabase.findById)
    // .delete(discogsDatbase.hide)

module.exports = router;
