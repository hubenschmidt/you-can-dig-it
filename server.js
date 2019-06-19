require('dotenv').config();
const express = require("express");
const path = require("path");
const fs = require("fs");
var http = require("http");
const https = require("https");
const session = require("express-session")
const socketio = require("socket.io");
// const authRouter = require("./lib/auth.router")
const passportInit = require("./config/passport")
const { SESSION_SECRET, CLIENT_ORIGIN } = require("./config/oauth.js")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");
const cors = require('cors');
const app = express();

let server;

if (process.env.NODE_ENV = 'production'){
  server = http.createServer(app)
} else {
// for setting up https server if OAuth client needed https
const certOptions = {
  key: fs.readFileSync(path.resolve("./key.pem")),
  cert: fs.readFileSync(path.resolve("./certificate.pem")),
}
  server = https.createServer(certOptions, app);
}

//accept requests from the client
app.use(cors({
  origin: CLIENT_ORIGIN
}));

//saveUninitialized: true allows us to attach the socket id to the session
//before we have authenticated the user
app.use(session({
  secret: 'entropy evolution',
  resave: true,
  saveUninitialized: true
}));

//Connecting sockets to the server and adding them to the request
//so that we can access them later in the controller
const io = socketio(server)
app.set('io', io)

//routes
const routes = require('./routes')

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
passportInit();

// Passport config
require("./config/passport")(passport);

//Express use API Routing
app.use(routes);

//Log HTTP requests
app.use(logger('dev'));

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server is running on Port: ${port} !`));
