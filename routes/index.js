const path = require('path');
const router = require('express').Router();
const apiRoutes = require('/api')
console.log(apiRoutes)

//API routes
router.use('/api', apiRoutes)

// if no API routes are hit, send the React app
router.use(function(req,res){
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;