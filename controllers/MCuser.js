var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');
var index = require('./index.js');

// GET Exam pages
router.get('/cpt', isLoggedIn, function(req, res) {
  res.render('cpt_exam.jade', { user: req.user });
});
router.get('/cmt', isLoggedIn, function(req, res) {
  res.render('cmt_exam.jade', { user: req.user });
});
router.get('/cns', isLoggedIn, function(req, res) {
  res.render('cns_exam.jade', { user: req.user });
});


//------- Submit Exam Scores Update Score -------

// ==== SUBMIT CPT EXAM ====
router.post('/cpt', function(req, res) {
  var Cuser = req.user;
  var Cu_id = req.user._id;
  var Cuemail = Cuser.local.email;
  var hScore = Cuser.certs.cpt.score;
  var newScore = req.body.score;
  var Cpassed_on = (Cuser.certs.cpt.passed_on == null) ? null : Cuser.certs.cpt.passed_on;
  var today = new Date();
  User.findOneAndUpdate(
    {'local.email': Cuemail},
    { $set: { 'certs.cpt.verify_id': Cu_id + 'cpt',
              'certs.cpt.score' : (newScore > hScore) ? newScore : hScore,
              'certs.cpt.passed' : (newScore > 69 | hScore > 69) ? true : false,
              'certs.cpt.passed_on' : 
                (newScore > 69 && Cpassed_on == null) ? today : Cpassed_on 
      },
      $push: { 'certs.cpt.attempts': today }
    },
    {new: true, runValidators: true},
    function(err, updated_user) {
      if (err) console.log(err);
      //res.json(updated_user);
      res.redirect('/dashboard#/my-certs', index, { user: req.user })
    } 
  ); // End findOneAndUpdate()
});

// ==== SUBMIT CMT EXAM ====
router.post('/cmt', function(req, res) {
  var Cuser = req.user;
  var Cu_id = req.user._id;
  var Cuemail = Cuser.local.email;
  var hScore = Cuser.certs.cmt.score;
  var newScore = req.body.score;
  var Cpassed_on = (Cuser.certs.cmt.passed_on == null) ? null : Cuser.certs.cmt.passed_on;
  var today = new Date();
  User.findOneAndUpdate(
    {'local.email': Cuemail},
    { $set: { 'certs.cmt.verify_id': Cu_id + 'cmt',
              'certs.cmt.score' : (newScore > hScore) ? newScore : hScore,
              'certs.cmt.passed' : (newScore > 69 | hScore > 69) ? true : false,
              'certs.cmt.passed_on' : 
                (newScore > 69 && Cpassed_on == null) ? today : Cpassed_on 
      },
      $push: { 'certs.cmt.attempts': today }
    },
    {new: true, runValidators: true},
    function(err, updated_user) {
      if (err) console.log(err);
      //res.json(updated_user);
      res.redirect('/dashboard#/my-certs', index, { user: req.user })
    } 
  ); // End findOneAndUpdate()
});

// ==== SUBMIT CNS EXAM ====
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

// ============= GET Payment Page =================
router.get('/payment', isLoggedIn, function(req, res) {
  res.render('payment.jade', { user: req.user })
});

// ============= POST Payment Form ================
router.post('/payment', isLoggedIn, function(req, res) {
  var Cuser = req.user;
  var Cuemail = req.user.local.email;
  var selectedCert = req.body.certType;
  var certPaid = req.body.certType.concat('.paid');
  var certPaid_on = req.body.certType.concat('.paid_on'); 
  var today = new Date();
  var setFields = {};
  setFields[certPaid] = true; // add payment validation
  setFields[certPaid_on] = today;
  User.findOneAndUpdate(
    {'local.email': Cuemail},
    { $set: setFields,
    },
    {new: true, runValidators: true},
    function(err, paid_user) {
      if (err) console.log(err);
      //res.json(paid_user);
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

