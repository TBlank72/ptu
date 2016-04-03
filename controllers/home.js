/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};
/*
app.get('/about', homeController.about);
app.get('/faq', homeController.faq);
app.get('/certifications', homeController.certifications);
app.post('/verify', homeController.verifycert);
*/



/*
/**
 * GET /
 * About page.
 */
exports.about = function(req, res) {
  res.render('about');
};

/**
 * GET /
 * FAQ page.
 */
exports.faq = function(req, res) {
  res.render('faq');
};

/**
 * GET /
 * Certifications page.
 */
exports.certs = function(req, res) {
  res.render('certs');
};

/**
 * GET /
 * Study page.
 */
exports.study = function(req, res) {
  res.render('study');
};
