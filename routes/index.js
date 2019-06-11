const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api')
const authRoutes = require('./auth');

// API routes
router.use('/api', apiRoutes)
router.use('/auth', authRoutes)

// if no API routes are hit, send the React app
// router.use(function(req,res){
//     res.sendFile(path.join(__dirname, "../public/index.html"));
// });

module.exports = router;