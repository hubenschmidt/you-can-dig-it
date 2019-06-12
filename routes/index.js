const path = require('path');
const express = require('express');
const router = require('express').Router();
const localAuth = require('../controllers/localAuth');

const apiRoutes = require('./api')
const authRoutes = require('./auth');

// API routes
router.use('/api', apiRoutes)
router.use('/auth', authRoutes)

//restrict index for logged in user only
// router.get('/', localAuth.register);

// //route to register page
// router.get('/register', localAuth.doRegister);

// //router for register action
// router.post('/register', localAuth.register);

// //route to login page
// router.get('/login', localAuth.login);

// //route for login action
// router.post('/login', localAuth.doLogin);

// //route for logout action
// router.get('/logout', localAuth.logout);

// if no API routes are hit, send the React app
// router.use(function(req,res){
//     res.sendFile(path.join(__dirname, "../public/index.html"));
// });

module.exports = router;