const path = require('path');
const express = require('express');
const router = require('express').Router();

const apiRoutes = require('./api')
const authRoutes = require('./auth');

//protect API endpoints with authentication function 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signin');
}

// API routes
router.use('/api', isLoggedIn, apiRoutes)
router.use('/auth', isLoggedIn, authRoutes)

// if no API routes are hit, send the React app
// router.use(function(req,res){
//     res.sendFile(path.join(__dirname, "../public/index.html"));
// });

module.exports = router;