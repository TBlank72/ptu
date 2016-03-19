var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');
var index = require('./index.js');

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

// Submit Exam Scores Update Score
router.post('/cpt', isLoggedIn, function(req, res) {
  res.redirect('/dashboard', index, { user: req.user })
});

router.post('/cmt', isLoggedIn, function(req, res) {
  res.redirect('/dashboard', index, { user: req.user })
});

*/

router.post('/cns', function(req, res) {
  var Cuser = req.user;
  var Cu_id = req.user._id;
  var Cuemail = Cuser.local.email;
  var hScore = Cuser.certs.cns.score;
  var newScore = req.body.score;
  var Cpassed_on = (Cuser.certs.cns.passed_on == null) ? null : Cuser.certs.cns.passed_on;
  var today = new Date();
  User.findOneAndUpdate(
    {'local.email': Cuemail},
    { $set: { 'certs.cns.verify_id': Cu_id + 'cns',
              'certs.cns.score' : (newScore > hScore) ? newScore : hScore,
              'certs.cns.passed' : (newScore > 69 | hScore > 69) ? true : false,
              'certs.cns.passed_on' : 
                (newScore > 69 && Cpassed_on == null) ? today : Cpassed_on 
      },
      $push: { 'certs.cns.attempts': today }
    },
    {new: true, runValidators: true},
    function(err, updated_user) {
      if (err) console.log(err);
      //res.json(updated_user);
      res.redirect('/dashboard#/my-certs', index, { user: req.user })
    } 
  ); // End findOneAndUpdate()
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
