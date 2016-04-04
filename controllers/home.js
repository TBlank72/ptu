/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

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
