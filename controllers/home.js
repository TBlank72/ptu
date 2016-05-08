var path = require('path');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Personal Trainer Certifications | PT University',
    desc: "Online Personal Trainer Certifications from PT University; Don't pay unless you pass. Become a top rated personal trainer with advanced credentials",
    canon: "https://www.ptuniversity.org"
  });
};

/**
 * GET /
 * About page.
 */
exports.about = function(req, res) {
  res.render('about', {
    title: 'PT University | Learn About Online Personal Trainer Certifications',
    desc: "Online Personal Trainer Certifications; Don't pay unless you pass. Learn how to become a top rated personal trainer with advanced credentials",
    canon: "https://www.ptuniversity.org/about"
  });
};

/**
 * GET /
 * FAQ page.
 */
exports.faq = function(req, res) {
  res.render('faq', {
    title: 'PT University | Frequently Asked Questions',
    desc: "Online Personal Trainer Certifications from PT University; Frequently asked questions",
    canon: "https://www.ptuniversity.org/faq"
  });
};

/**
 * GET /
 * Certifications page.
 */
exports.certs = function(req, res) {
  res.render('certs', {
    title: 'Online Personal Trainer Certifications | PT University',
    desc: "Online Personal Trainer Certifications from PT University; Don't pay unless you pass. Become a top rated personal trainer with advanced credentials",
    canon: "https://www.ptuniversity.org/certifications"
  });
};

/**
 * GET /
 * Study page.
 */
exports.study = function(req, res) {
  res.render('study', {
    title: 'Study Personal Training Online | PT University',
    desc: 'study online personal training certifications exam material, exercise science books, nutrition books',
    canon: "https://www.ptuniversity.org/study"
  });
};

/**
 * GET /
 * Study Guide pdf.
 */
exports.studyGuidePdf = function(req, res) {
  res.sendFile('PTU-HandBook.pdf', {
    root: path.join(__dirname, '../views/study'),
    title: 'PT University | Personal Trainers Handbook',
    desc: 'PT University handbook and study guide',
    canon: "https://www.ptuniversity.org/study/PTU-study-guide-pdf"
  });
};

/**
 * GET /
 * Article Guidlines page.
 */
exports.articleGuidelines = function(req, res) {
  res.render('article-guidelines', {
    title: 'PT University | Article Submission Guidelines',
    desc: "PT University Editorial Guidelines for article submission.",
    canon: "https://www.ptuniversity.org/article-guidelines"
  });
};

/**
 * GET /
 * Trainer Resources page.
 */
exports.trainerResources = function(req, res) {
  res.render('trainer-resources-p', {
    title: 'PT University | Personal Trainer Resources',
    desc: "Personal trainer's toolbox. Tools that personal trainers use every day. Par-Q, 1 Rep max conversion charts, top 20 foods list, healthy foods list",
    canon: "https://www.ptuniversity.org/trainer-resources"
  });
};

/**
 * GET /
 * Trainer Resources File.
 */
exports.tResource = function(req, res) {
  var resource = req.params.resource;
  res.sendFile(resource, {
    root: path.join(__dirname, '../views/trainer-resources'),
    title: resource + ' | PT University',
    desc: resource + ' | PT University trainer resources',
    canon: "https://www.ptuniversity.org/trainer-resources/" + resource

  });
};

/**
 * GET /
 * Price Comparison page.
 */
exports.priceCompare = function(req, res) {
  res.render('price-compare', {
    title: 'PT University | Price Comparison Online Personal Trainer Certifications',
    desc: 'Price comparison for top personal training certifications',
    canon: "https://www.ptuniversity.org/pricecompare"
  });
};

/**
 * GET /
 * Link-to-ptu page.
 */
exports.linkToPtu = function(req, res) {
  res.render('link-to-ptu', {
    title: 'PT University | Online Personal Trainer Certifications',
    desc: 'PT University welcomes links from our certified professionals',
    canon: "https://www.ptuniversity.org/link-to-ptu"
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
 * GET /blog
 * blog home page.
exports.blog = function(req, res, next) {
  res.render('blog/blog-home', {
    title: ' Blog | PT University',
    desc: ' Blog | PT University; personal trainer articles, trainer resources, exercise and fitness tips'

  });
};
 */

/**
 * GET /blog/:blog (article)
 * blog article.
exports.blogArticle = function(req, res, next) {
  var blog = req.params.blog;
  //res.send(req.params.blog);
  res.render('blog/' + blog, {
    title: metaFormatter(blog) + ' | PT University',
    desc: metaFormatter(blog) + ' | PT University'

  });
};
 */

/**
 * GET /
 * User sitemap page.
 */
exports.sitemap = function(req, res) {
  res.render('sitemap', {
    title: 'PT University | Sitemap',
    desc: 'PT University sitemap',
    canon: "https://www.ptuniversity.org/ptu-sitemap"
  });
};

/**
 * GET /
 * mobile.
 */
exports.getMobile = function(req, res) {
  res.redirect(301, '/');
};

/*
function metaFormatter(blob) {
  var split = blob.split('-');
  var joined = split.join(' ');
  return joined;
}
*/
