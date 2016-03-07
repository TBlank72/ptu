var express = require('express');
var passport = require('passport');
var router = express.Router();


  //---- NON PRROTECTED PAGES------
  router.get('/', function(req, res) {
    res.render('index.jade', { user: req.user });
  });

  router.get('/about', function(req, res) {
    res.render('about.jade', { user: req.user });
  });

  router.get('/certifications', function(req, res) {
    res.render('certs.jade', { user: req.user });
  });

  router.get('/faq', function(req, res) {
    res.render('faq.jade', { user: req.user });
  });

  router.get('/support', function(req, res) {
    res.render('support.jade', { user: req.user });
  });

  router.get('/login', function(req, res) {
    res.render('login.jade', {message: req.flash('loginMessage')});
  });

  router.get('/signup', function(req, res) {
    res.render('signup.jade', {message: req.flash('signupMessage')});
  });

  // ============Authorized Routes====================
  // process the login form
  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/dashboard',
    failureRedirect : '/login',
    failureFlash : true
  }));

  router.post('/login', passport.authenticate('local-login', {
    //success should send user info to angular
    // then redirect to /dashboard
    // look at previous examples
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }));


  // process the signup form
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard', // redirect to secure profile
    failureRedirect: '/signup', // redirect to signup page
    failureFlash: true // allow flash message
  }));

  // DASHBOARD SECTION =====================
  // THIS WILL BE PROTECTED.  MUST BE LOGGED IN
  router.get('/dashboard', isLoggedIn, function(req, res) {
    //get user from session and pass to template
    res.render('dashboard.jade', { user: req.user });
  });
  ///route partials request
  router.get('/partials/:name', function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name, { user: req.user });
  });

  //logout
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


// route middleware to make sure the user is logged in...Add this to AuthSevice factory
function isLoggedIn(req, res, next) {

  // if user is logged in, continue
  if (req.isAuthenticated())
    console.log("user isLoggedIn");
    return next();

  // if user isn't authenticated, redirect to home page
  res.redirect('/login');
};

module.exports = router;
