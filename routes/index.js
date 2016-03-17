var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');


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
  /*  --UNCOMMENT TO USE ANGULAR LOGIN--
      -- FLASH MESSAGE WON'T WORK THOUGH
      -- WILL NEED TO ADD FLASH MESSAGES TO LOGINCTRL
  // Send success state to ang loginCtrl
  router.get('/success', function(req, res) {
    res.send({ state: 'success', user: req.user ? req.user : null });
  });
  //sends failure login state back to angular
	router.get('/failure', function(req, res){
		res.send({state: 'failure', user: null, message: "Invalid username or password"});
	});*/
  // process the login form
  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard#/my-certs',
    failureRedirect: '/login',
    failureFlash: true
  }));



  // process the signup form
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard#/my-certs', // redirect to secure profile
    failureRedirect: '/signup', // redirect to signup page
    failureFlash: true // allow flash message
  }));

  // DASHBOARD SECTION =====================
  router.get('/dashboard', isLoggedIn, function(req, res) {
    res.render('dashboard.jade', { user: req.user });
  });
  ///route partials request
  router.get('/partials/:name', function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name, { user: req.user });
  });

  // update user info *****use same method as submit score****
  router.put('/updatecontact', isLoggedIn, function(req, res) {
    User.update({'local.email': email}, {
      username: username,
      password: password,
      email: email
    })
  });

  //logout
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


// route middleware to make sure the user is logged in
function isLoggedIn(req, res, next) {

  // if user is logged in, continue
  if (req.isAuthenticated()) {
    console.log("user isLoggedIn");
    return next();
  }
  else {
  // if user isn't authenticated, redirect to home page
    console.log('user NOT logged in');
    res.redirect('/login');
    };
}; // end isLoggedIn

module.exports = router;
