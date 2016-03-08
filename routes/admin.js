var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');


  //---- NON PRROTECTED PAGES------
  router.get('/', function(req, res) {
    res.render('admin.jade');
  });

  // Get all users
  router.get('/users', function(req, res) {
    User.find({}).exec(function(err, users) {
      res.json({users: users})
    });
  });


module.exports = router;
