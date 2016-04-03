var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');


  router.get('/', function(req, res) {
    res.render('admin.jade');
  });

  // Get all users
  router.get('/users', function(req, res) {
    User.find({}).exec(function(err, users) {
      res.render('admin', {users: users})
    });
  });

  ///route partials request
  router.get('/partials/:name', function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name, { user: req.user });
  });

module.exports = router;
