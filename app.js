/**
 * Module dependencies.
 */
require ('newrelic');
var express = require('express');
//const throng = require('throng');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var dotenv = require('dotenv');
var MongoStore = require('connect-mongo/es5')(session);
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var sass = require('node-sass-middleware');
var multer = require('multer');
var upload = multer({ dest: path.join(__dirname, 'uploads') });
var compressor = require('node-minify');
var WORKERS = process.env.WEB_CONCURRENCY || 1;

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 */
dotenv.config({silent: true});

/*
 * Minify all Public Controllers JavaScript
 * Uncomment and run without nodemon to minify
 */
//new compressor.minify({
//  type: 'yui-js',
//  fileIn: 'public/js/controllers/**/*.js',
//  fileOut: 'public/js-dist/all-controllers-min.js',
//  options: ['--nomunge'],
//  sync: true, 
//  callback: function(err, min) {
//    console.log('error: ' + err);
//    //console.log(min);
//  }
//});

/*
throng({
  workers: WORKERS,
  lifetime: Infinity,
  start: startFunction
});

// NODE CLUSTER - Uncomment to spawn workers
// Wrap around processes for workers?
function startFunction() {
  // ...
}
*/
/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var examController = require('./controllers/exam');
var apiController = require('./controllers/api');
var contactController = require('./controllers/contact');

/**
 * API keys and Passport configuration.
 */
var passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
var app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

mongoose.connection.once('open', function() {
  console.log('DATABASE CONNECTION SUCCESSFUL...');
});
/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB || process.env.MONGOLAB_URI,
    autoReconnect: true,
    ttl: 14 * 24 * 60 * 60, // = 14 days. Default
    touchAfter: 24 * 3600, // limits resave to db 1/24 hours
    autoRemove: 'native'
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
  if (req.path === '/api/upload' || req.path == '/api/stripe/charges') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

/*
app.use(function(req, res, next) {
  // After successful login, redirect back to /api, /contact or /
  if (/(api)|(contact)|(^\/$)/i.test(req.path)) {
    req.session.returnTo = req.path;
  }
  next();
});
*/

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 604800000 }));
app.use('/blog', express.static('hexo-blog/pub-hexo'));

//app.disable('etag');

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/about', homeController.about);
app.get('/faq', homeController.faq);
app.get('/certifications', homeController.certs);
app.get('/study', homeController.study);
app.get('/study/PTU-study-guide-pdf', homeController.studyGuidePdf);
app.get('/link-to-ptu', homeController.linkToPtu);
app.get('/article-guidelines', homeController.articleGuidelines);
app.get('/trainer-resources', homeController.trainerResources);
app.get('/trainer-resources/:resource', homeController.tResource);
//app.get('/blog', homeController.blog);
//app.get('/blog/:blog', homeController.blogArticle);
app.get('/pricecompare', homeController.priceCompare);
app.get('/images/:img', homeController.getImage); 
app.get('/mobile', homeController.getMobile); 
app.get('/m', homeController.getMobile); 
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);
app.post('/account/payment', apiController.postStripe);
app.get('/ptu-sitemap', homeController.sitemap);
app.post('/account/download-cert/cpt', passportConfig.isAuthenticated, userController.downloadCPT);
app.post('/account/download-cert/cmt', passportConfig.isAuthenticated, userController.downloadCMT);
app.post('/account/download-cert/cns', passportConfig.isAuthenticated, userController.downloadCNS);


/**
 * Certification Exam app routes.
 */
app.get('/cpt', examController.getCpt);
app.get('/cptpractice1', examController.getPracticeCpt);
app.get('/cptpractice2', examController.getPracticeCpt);
app.get('/cptpractice3', examController.getPracticeCpt);
app.get('/cmt', examController.getCmt);
app.get('/cmtpractice1', examController.getPracticeCmt);
app.get('/cmtpractice2', examController.getPracticeCmt);
app.get('/cmtpractice3', examController.getPracticeCmt);
app.get('/cns', examController.getCns);
app.get('/cnspractice1', examController.getPracticeCns);
app.get('/cnspractice2', examController.getPracticeCns);
app.get('/cnspractice3', examController.getPracticeCns);
app.get('/test', examController.getTest);
app.get('/testpractice1', examController.getPracticeTest);
app.get('/testpractice2', examController.getPracticeTest);
app.get('/testpractice3', examController.getPracticeTest);
app.post('/cpt', examController.submitCpt);
app.post('/cmt', examController.submitCmt);
app.post('/cns', examController.submitCns);
app.post('/test', examController.submitTest);
app.post('/verify-trainer-cert', examController.verifyCert);

/**
 * API routes.
 */
app.post('/api/sendgrid', contactController.sendGridHook);
app.post('/api/stripe/charges', apiController.postStripeCharges);
app.post('/api/stripe', apiController.postStripe);

/**
 * OAuth authentication API routes. (Sign in)
 */
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});


/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

// 404 Page
app.use(function(req, res, next) {
  res.status(404).render('error404');
});

module.exports = app;
