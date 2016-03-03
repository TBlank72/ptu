module.exports = function(app, passport) {
  //---- NON PRROTECTED PAGES------
  app.get('/', function(req, res) {
    res.render('index.jade', { user: req.user });
  });

  app.get('/about', function(req, res) {
    res.render('about.jade', { user: req.user });
  });

  app.get('/certifications', function(req, res) {
    res.render('certs.jade', { user: req.user });
  });

  app.get('/faq', function(req, res) {
    res.render('faq.jade', { user: req.user });
  });

  app.get('/support', function(req, res) {
    res.render('support.jade', { user: req.user });
  });

  app.get('/login', function(req, res) {
    res.render('login.jade', {message: req.flash('loginMessage')});
  });

  app.get('/signup', function(req, res) {
    res.render('signup.jade', {message: req.flash('signupMessage')});
  });

  // ============Authorized Routes====================
  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/dashboard',
    failureRedirect : '/login',
    failureFlash : true
  }));



  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard', // redirect to secure profile
    failureRedirect: '/signup', // redirect to signup page
    failureFlash: true // allow flash message
  }));

  // DASHBOARD SECTION =====================
  // THIS WILL BE PROTECTED.  MUST BE LOGGED IN
  app.get('/dashboard', isLoggedIn, function(req, res) {
    //get user from session and pass to template
    res.render('dashboard.jade', { user: req.user });
  });

  //logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure the user is logged in
function isLoggedIn(req, res, next) {

  // if user is logged in, continue
  if (req.isAuthenticated())
    return next();

  // if user isn't authenticated, redirect to home page
  res.redirect('/login');
}
