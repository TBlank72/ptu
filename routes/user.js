var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');


// GET Exam pages
router.get('/cpt', isLoggedIn, function(req, res) {
  res.render('cpt_exam.jade', { user: req.user })
});
router.get('/cmt', isLoggedIn, function(req, res) {
  res.render('cmt_exam.jade', { user: req.user })
});
router.get('/cns', isLoggedIn, function(req, res) {
  res.render('cns_exam.jade', { user: req.user })
});
/*
// Submit Exam Scores
router.post('/cpt', isLoggedIn, function(req, res) {
  User.findOne('user.local.email') {
    user.cpt.score = score;
    user.cpt.passed = (score >= 70) ? true : false;
    //user.cpt.
  }
});
router.post('/cmt', isLoggedIn, function(req, res) {
  res.render('cmt_exam.jade', { user: req.user })
});
router.post('/cns', isLoggedIn, function(req, res) {
  User.findOne('user.local.email') {
    res.send( req.user );
    user.cns.score = score;
    user.cns.passed = (score >= 70) ? true : false;
    //user.cpt.
  }
});
*/
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
