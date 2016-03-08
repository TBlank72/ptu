var express = require('express');
var passport = require('passport');
var router = express.Router();



router.get('/cpt', isLoggedIn, function(req, res) {
  res.render('cpt_exam.jade', { user: req.user })
});
router.get('/cmt', isLoggedIn, function(req, res) {
  res.render('cmt_exam.jade', { user: req.user })
});
router.get('/cns', isLoggedIn, function(req, res) {
  res.render('cns_exam.jade', { user: req.user })
});


// route middleware to make sure the user is logged in...Add this to AuthSevice factory

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
