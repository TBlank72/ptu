// app.js
// set up =============================
var express  = require('express');
var path     = require('path');
var app      = express();

var favicon = require('serve-favicon');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// passpassport configuration + initialization
var passportConfig = require('./config/passport');
passportConfig(passport);

// db configuration
var configDB = require('./config/database');
var uriString =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/ptu';

// db connection
mongoose.connect(uriString, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uriString + '. ' + err);
  } else {
    console.log('SUCCESSFUL DATABASE CONNECTION AT: ' + uriString);
  }
});

/*
var db = mongoose.connection;
db.on('error', console.error.bind(console,
     'connection error:')); 
db.once('open', function() {
  console.log('DATABASE CONNECTION SUCCESSFUL...');
});
*/

//------- set up our express application-------
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// log every request to the console
app.use(morgan('dev'));
// read cookies (needed for auth)
app.use(cookieParser());
// body parser - get info from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set path for client files in public folder
app.use(express.static(path.join('public')));
app.use("/user", express.static(__dirname + '/public'));
app.use("/admin", express.static(__dirname + '/public'));
app.use('/cert_files', express.static('cert_files'));

// set jade view engin
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
app.use(flash());// flash message stored in session


// Configuer routes
var index = require('./routes/index');
var user = require('./routes/user');
var admin = require('./routes/admin');
app.use('/', index);
app.use('/user', user);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
