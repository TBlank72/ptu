/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'PT University | Online Personal Trainer Certifications'
  });
};

/**
 * GET /
 * About page.
 */
exports.about = function(req, res) {
  res.render('about', {
    title: 'PT University | Online Personal Trainer Certifications'
  });
};

/**
 * GET /
 * FAQ page.
 */
exports.faq = function(req, res) {
  res.render('faq', {
    title: 'PT University | Online Personal Trainer Certifications'
  });
};

/**
 * GET /
 * Certifications page.
 */
exports.certs = function(req, res) {
  res.render('certs', {
    title: 'PT University | Online Personal Trainer Certifications'
  });
};

/**
 * GET /
 * Study page.
 */
exports.study = function(req, res) {
  res.render('study', {
    title: 'PT University | Online Personal Trainer Certifications',
    desc: 'study online personal training certification'
  });
};

/**
 * GET /
 * Price Comparison page.
 */
exports.priceCompare = function(req, res) {
  res.render('price-compare', {
    title: 'PT University | Price Comparison Online Personal Trainer Certifications',
    desc: 'online personal training certification price comparison'
  });
};

/**
 * GET /
 * Images.
 */
exports.getImage = function(req, res) {
  var img = req.params.name;
  res.send('public/images/' + img);
};

/**
 * GET /
 * blog.
 */
exports.blog = function(req, res) {
  var blog = req.params.blog;
  //res.send(req.params.blog);
  res.render('blog/' + blog);
};

/**
 * GET /
 * mobile.
 */
exports.getMobile = function(req, res) {
  res.redirect(301, '/');
};
