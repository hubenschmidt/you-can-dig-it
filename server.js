
// *****************************************************************************
// Server.js - This file is the starting point for the Node/Express server.
//
// ******************************************************************************

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes')


// Express
const app = express();
const PORT = process.env.PORT || 3000;

//connect to MongoDB
const MONGDODB_URI = process.env.MONGDODB_URI || 'mongodb://localhost/YouCanDigIt'
mongoose.connect(MONGDODB_URI, {
    useNewUrlParser: true 
});

const db = mongoose.connection;

db.on('error', function(error){
    console.log('mongoose error: ', error);
});

db.once('open', function(){
    console.log('mongoose connection successful');
})

//Static directory
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('public'));
}

//BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//API Routing
app.use(routes)

//Handle CORS
app.use(cors());

//Start server
app.listen(PORT, function(){
    console.log("Server is running on Port: " + PORT)
});

// module.exports = server
