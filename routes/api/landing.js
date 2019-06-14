const router = require('express').Router();

//Matches with "/api/landing"
router
    .route('/')
    .get((req, res) => {
        res.redirect('../auth/authorize')
    });


module.exports = router;
