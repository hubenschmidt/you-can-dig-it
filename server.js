const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");

//oauth-sockets-passport server additions:
require('dotenv').config()
const path = require('path')
const fs = require('fs')
const https = require('https')
const http = require('http')
const session = require('express-session')
const cors = require('cors')
const socketio = require('socket.io')
const uuid = require('uuid/v4')
const FileStore = require('session-file-store')(session)
const passportInit = require('./config/passport')
const { CLIENT_ORIGIN } = require('./config/oauth.providers')
//routes
const routes = require('./routes')
let server

const app = express();

// If we are in production we are already running in https
if (process.env.NODE_ENV === 'production') {
  
  server = http.createServer(app)
}
// We are not in production so load up our certificates to be able to 
// run the server in https mode locally
else {
  const certOptions = {
    key: fs.readFileSync(path.resolve('./certs/key.pem')),
    cert: fs.readFileSync(path.resolve('./certs/certificate.pem'))
  }
  
  server = https.createServer(certOptions, app)
}

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

// Accept requests from our client
app.use(cors(corsOptions));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, './client/build')));
}

// app.use(express.static('public'));


// saveUninitialized: true allows us to attach the socket id to the session
// before we have authenticated the user
app.use(session({
  genid: req => uuid(),
  store: new FileStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

//the custom middleware allows us to attach the socket id to the session
//with that socket id we can send back the right user info to the right socket
app.use((req, res, next) => {
  req.session.socketId = req.query.socketId
  next();
})

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
const io = socketio("https://young-mesa-54357.herokuapp.com" || server)
app.set('io', io)

// Catch a start up request so that a sleepy Discogs instance can  
// be responsive as soon as possible
app.get('/wake-up', (req, res) => {
  // console.log('/wake-up', req.session)
  res.send('👍')
})

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to the Mongo DB
if (process.env.NODE_ENV === "production") {
  mongoose.connect(process.env.PRODUCTION_DB_URL);
} else {
  mongoose.connect(process.env.PRODUCTION_DB_URL || db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err))
};


// // Connect to MongoDB
// mongoose.connect(db,{ useNewUrlParser: true }
//   )
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

// Setup for passport and to accept JSON objects
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session());

// Passport config
require("./config/passport")(passport);

//suppress mongoose DeprecationWarnings 
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Express use API Routing
app.use(routes);

//Log HTTP requests
app.use(logger('dev'));

// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server is running on Port: ${port} !`));
