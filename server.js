// server.js

// set up ============================================
// get all the tools we need
var express  = require('express');
var path     = require('path');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database');

// configuration ===============
 // connect to our database
mongoose.connect(configDB.url);
 // passpassport configuration
require('./config/passport')(passport);

//------- set up our express application-------
 // log every request to the console
app.use(morgan('dev'));
 // read cookies (needed for auth)
app.use(cookieParser());
// body parser - get info from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// set path for static assets in public dir
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cert_files', express.static('cert_files'));
app.use(express.static('partials'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // set up jade

// required for passport
app.use(session({
  secret: 'ilovescotch',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
