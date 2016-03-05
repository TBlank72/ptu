var LocalStrategy = require('passport-local').Strategy;
var flash = ('connect-flash');
// load user model
var User = require('../models/user');

// expose this function to our app
module.exports = function(passport) {

  //=====passport session setup==========
  // required for persistent logins
  // passport needs to serialize/deserialize users for a session

  // serialize user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  // deserialize user from the session
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // ==========LOCAL SIGNUP================
  // We're using named strategies since we have one for login and
  // one for signup.  By default, it would be called 'local'
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username.  we override this
    // with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass req to callback
  },
  function(req, email, password, done) {
    // asynchronous
    // User.findOne won't fire unless data is sent back
    process.nextTick(function() {
      //find user whose email matches the form's email
      User.findOne({'local.email' : email }, function(err, user) {
        // if error occurs, return error
        if (err)
          return done(err);
        // check if user exists with that email
        if (user) {
          return done(null, false, req.flash('signupMessage', email+' is already taken by a user.'));
        } else {
          //if there is no user with that email
          //create a new user
          var newUser = new User();
          // set user's local credentials
          // below may need to be req.body.email...
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          // save the user
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          }); // end newUser.save
        } // end else { successfull create newUser }

      }); // end User.findOne

    }); // end process.nextTick
  })); // end passport.use('local-signup')
  // ==========LOCAL LOGIN================
  // We're using named strategies since we have one for login and
  // one for signup.  By default, it would be called 'local'
  passport.use('local-login', new LocalStrategy({
    // default is username.  we change it to email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    // find user whose email matches form email
    User.findOne({ 'local.email' : email }, function(err, user) {
      if (err)
        return done(err);

      if (!user)
        return done(null, false, req.flash('loginMessage', 'User not found with email: ' + email));

      if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      //user below returned to router if success
      return done(null, user);
    }); // end User.findOne

  })); // end passport.use('local-login')

}; // end module.exports
