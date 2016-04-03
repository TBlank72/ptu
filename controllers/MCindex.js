var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');
var flash = ('connect-flash');


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
/*
  router.get('/forgot', userController.getForgot);
  router.post('/forgot', userController.postForgot);
*/

  // process the signup form
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard#/my-certs', // redirect to secure profile
    failureRedirect: '/signup', // redirect to signup page
    failureFlash: true // allow flash message
  }));

  // DASHBOARD SECTION =====================
  router.get('/dashboard', isLoggedIn, function(req, res) {
    res.render('dashboard.jade', 
               { user: req.user,
                 fmessage: req.flash('fmessage'),
                 smessage: req.flash('smessage')
               });
  });

  ///route partials request
  router.get('/partials/:name', function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name, { user: req.user });
  });

  /// email exists contact update fail flash
  router.get('/eflashfail', function(req, res) {
    req.flash('fmessage', 'email already exists')
    res.redirect('/dashboard#/contact-info');
  });

  /// contact update success flash
  router.get('/eflashsuccess', function(req, res) {
    req.flash('smessage', 'Contact info updated successfully')
    res.redirect('/dashboard#/contact-info');
  });
  // ------------ update contact-info ------------ 
  router.post('/updatecontact', function(req, res) {
    var Cuser = req.user;
    var Cuemail = Cuser.local.email;
    var newEmail = req.body.newEmail;
    var newName = req.body.newName;
    User.findOne({'local.email': newEmail}, function(err, user) {
      if (err) console.log(err);
      if (user) {
        res.redirect('/eflashfail');
      }
      else {

        User.findOneAndUpdate(
          {'local.email': Cuemail },
          { $set: {
            'local.email' : (newEmail == "") ? Cuser.local.email : newEmail,
             'local.name' : (newName == "") ? Cuser.local.name : newName
          }}, // end $set:
          { new: true, runValidators: true },
          function(err, updated_user) {
            res.redirect('/eflashsuccess');
          }// End res function
        ); // End findOneAndUpdate()
      }
    }
    ); // End User.findOne
  }); // End router.post(/updatecontact...

  /// old password doesn't match fail flash 
  router.get('/pflashfail', function(req, res) {
    req.flash('fmessage', "Old Password doesn't match")
    res.redirect('/dashboard#/password');
  });

  /// Password update success flash
  router.get('/pflashsuccess', function(req, res) {
    req.flash('smessage', "Password updated sucessfully")
    res.redirect('/dashboard#/password');
  });
  // ------------ update password ------------ 
  router.post('/updatepassword', function(req, res) {
    var Cuser = req.user;
    var Cuemail = Cuser.local.email;
    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;
    User.findOne({'local.email': Cuemail}, function(err, user) { 
      if (err) console.log(err);
      if (!user.isValidPassword(oldPassword)) {
        res.redirect('/pflashfail');
      }
      else {
        User.findOneAndUpdate(
          {'local.email': Cuemail },
          { $set: {
            'local.password' : (newPassword == "") ? Cuser.local.password : Cuser.generateHash(newPassword),
          }}, // end $set:
          { new: true, runValidators: true },
          function(err, updated_user) {
            res.redirect('/pflashsuccess');
          }
        ); // End findOneAndUpdate()
      }
    }
    ); // End User.findOne
  }); // End post request

  //logout user
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Verify Certification form
  router.post('/verify', function(req, res) {
    var name = req.body.certType.concat('.verify_id');
    var value = req.body.req_verify_id;
    var query = {};
    query[name] = value;

    var thisCert = req.body.certType;
    var justCert = thisCert.slice(6);
    var proj = {};
    proj[thisCert] = 1;
    proj['local.name'] = 1;
    proj['_id'] = 0;
    User.findOne(query,
                 proj,
                 function (err, user_info) {
        if (err) console.log(err);
        if (user_info) {
          res.render('verified.jade',
                     { username: user_info.local.name,
                       cert: user_info.certs[justCert],
                       certImg: justCert
                     });
        }
        else {
          res.send('<h2>Certification Not Found</h2> <br />\
                   Possible causes: <br />\
                   1. The verification id was copied and pasted -- \
                   pasting as plain text should fix this. <br />\
                   2. The verification id was entered incorrectly -- \
                   double check and make sure everything is correct.\
                   <br />\
                   <h4><a href="/">back to ptu home</a></h4>');
        }
      }
    )
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
