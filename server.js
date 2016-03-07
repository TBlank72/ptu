// server.js
// set up =============================
var express  = require('express');
var path     = require('path');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// db configuration
var configDB = require('./config/database');

// configuration ===============
 // connect to our database
mongoose.connect(configDB.url);


 // passpassport configuration + initialization
var passportConfig = require('./config/passport');
passportConfig(passport);

//------- set up our express application-------
 // log every request to the console
app.use(morgan('dev'));
 // read cookies (needed for auth)
app.use(cookieParser());
// body parser - get info from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// set path for static assets in public dir
app.use(express.static(path.join('public')));
app.use("/user", express.static(__dirname + '/public'));
app.use('/cert_files', express.static('cert_files'));
//app.use('/views', express.static('views'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // set up jade

// required for passport
app.use(session({
  secret: 'ilovescotch',
  resave: false,
  saveUninitialized: false
}));// express-session needs to be configed before passport.session
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// load our routes and pass in our app and fully configured passport
//var index = require('./routes/index')(app, passport);
var index = require('./routes/index');
var user = require('./routes/user');
app.use('/', index);
app.use('/user', user);


// launch ==========================
app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app;
