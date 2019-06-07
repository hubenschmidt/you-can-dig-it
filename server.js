const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 3000;
const routes = require('./routes')

// app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routes)

const MONGDODB_URI = process.env.MONGDODB_URI || 'mongodb://localhost/diggin'

mongoose.Promise = Promise;
mongoose.connect(MONGDODB_URI, {
    useNewUrlParser: true 
});

app.use(cors());

app.listen(PORT, function(){
    console.log("Server is running on Port: " + PORT)
});