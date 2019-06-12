// *****************************************************************************
// Server.js - This file is the starting point for the Node/Express server.
//
// ******************************************************************************

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy


// Express
const app = express();
const PORT = process.env.PORT || 5000;

//DB config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
const MONGDODB_URI = process.env.MONGDODB_URI || 'mongodb://localhost/YouCanDigIt'
mongoose.connect(MONGDODB_URI, {
        useNewUrlParser: true
    })
    .then(() => console.log('Mongoose connection successful'))
    .catch((err) => console.error(err));
mongoose.Promise = global.Promise

//Static directory
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
}

//routes
const routes = require('./routes');

//Passport
require('./config/passport')(passport)
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
// app.use(passport.session());

//Passport configuration .. break out into ./config/passport/passport.js
var User = require('./models/User');
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


//BodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//API Routing
app.use(routes)

//Log HTTP requests
app.use(logger('dev'))

//Handle CORS
app.use(cors());

//Start server
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT)
});

// module.exports = server