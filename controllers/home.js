var path = require('path');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'PT University | Online Personal Trainer Certifications',
    desc: "Online Personal Trainer Certifications from PT University; Don't pay unless you pass. Become a top rated personal trainer with advanced credentials"
  });
};

/**
 * GET /
 * About page.
 */
exports.about = function(req, res) {
  res.render('about', {
    title: 'PT University | Online Personal Trainer Certifications',
    desc: "Online Personal Trainer Certifications from PT University; Don't pay unless you pass. Become a top rated personal trainer with advanced credentials"
  });
};

/**
 * GET /
 * FAQ page.
 */
exports.faq = function(req, res) {
  res.render('faq', {
    title: 'PT University | Online Personal Trainer Certifications',
    desc: "Online Personal Trainer Certifications from PT University; Don't pay unless you pass. Become a top rated personal trainer with advanced credentials"
  });
};

/**
 * GET /
 * Certifications page.
 */
exports.certs = function(req, res) {
  res.render('certs', {
    title: 'PT University | Online Personal Trainer Certifications',
    desc: "Online Personal Trainer Certifications from PT University; Don't pay unless you pass. Become a top rated personal trainer with advanced credentials"
  });
};

/**
 * GET /
 * Study page.
 */
exports.study = function(req, res) {
  res.render('study', {
    title: 'PT University | Online Personal Trainer Certifications',
    desc: 'study online personal training certifications exam material, exercise science books, nutrition books'
  });
};

/**
 * GET /
 * Study page.
 */
exports.articleGuidelines = function(req, res) {
  res.render('article-guidelines', {
    title: 'PT University | Article Submission Guidelines',
    desc: "PT University Editorial Guidelines for article submission."
  });
};

/**
 * GET /
 * Study Guide pdf.
 */
exports.studyGuidePdf = function(req, res) {
  res.sendFile('PTU-HandBook.pdf', {
    root: path.join(__dirname, '../views/study'),
    title: 'PT University | Online Personal Trainer Certifications',
    desc: 'study online personal training certifications exam material, exercise science books, nutrition books'
  });
};

/**
 * GET /
 * Price Comparison page.
 */
exports.priceCompare = function(req, res) {
  res.render('price-compare', {
    title: 'PT University | Price Comparison Online Personal Trainer Certifications',
    desc: 'Price comparison for top personal training certifications'
  });
};

/**
 * GET /
 * Link-to-ptu page.
 */
exports.linkToPtu = function(req, res) {
  res.render('link-to-ptu', {
    title: 'PT University | Online Personal Trainer Certifications',
    desc: 'PT University welcomes links from our certified professionals'
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
  res.render('blog/' + blog, {
    title: blog,
    desc: blog

  });
};

/**
 * GET /
 * mobile.
 */
exports.getMobile = function(req, res) {
  res.redirect(301, '/');
};
