const path = require('path');
const router = require('express').Router();
const singleRoutes = require('./single')


//API routes
router.use('/single', singleRoutes);
router.use('/single', randomRoutes);

//if no API routes are hit, send the React app
// router.use(function(req,res){
//     res.sendFile(path.join(__dirname, "build/index.html"));
// });

module.exports = router;