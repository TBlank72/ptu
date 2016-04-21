var _ = require('lodash');
var async = require('async');
var Payment = require('../models/payment');
var User = require('../models/user');

/**
 * Split into declaration and initialization for better startup performance.
 */
var validator;
var graph;
var Twit;
var stripe;
var Linkedin;
var paypal;
var ig;//???
var Y;//???
var request;

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = function(req, res) {
  res.render('api/index', {
    title: 'API Examples'
  });
};


/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = function(req, res, next) {
  graph = require('fbgraph');

  var token = _.find(req.user.tokens, { kind: 'facebook' });
  graph.setAccessToken(token.accessToken);
  async.parallel({
    getMe: function(done) {
      graph.get(req.user.facebook + "?fields=id,name,email,first_name,last_name,gender,link,locale,timezone", function(err, me) {
        done(err, me);
      });
    },
    getMyFriends: function(done) {
      graph.get(req.user.facebook + '/friends', function(err, friends) {
        done(err, friends.data);
      });
    }
  },
  function(err, results) {
    if (err) {
      return next(err);
    }
    res.render('api/facebook', {
      title: 'Facebook API',
      me: results.getMe,
      friends: results.getMyFriends
    });
  });
};

/**
 * GET /api/twitter
 * Twiter API example.
 */
exports.getTwitter = function(req, res, next) {
  Twit = require('twit');

  var token = _.find(req.user.tokens, { kind: 'twitter' });
  var T = new Twit({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });
  T.get('search/tweets', { q: 'nodejs since:2013-01-01', geocode: '40.71448,-74.00598,5mi', count: 10 }, function(err, reply) {
    if (err) {
      return next(err);
    }
    res.render('api/twitter', {
      title: 'Twitter API',
      tweets: reply.statuses
    });
  });
};

/**
 * POST /api/twitter
 * Post a tweet.
 */
exports.postTwitter = function(req, res, next) {
  req.assert('tweet', 'Tweet cannot be empty.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/api/twitter');
  }

  var token = _.find(req.user.tokens, { kind: 'twitter' });
  var T = new Twit({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });
  T.post('statuses/update', { status: req.body.tweet }, function(err, data, response) {
    if (err) {
      return next(err);
    }
    req.flash('success', { msg: 'Tweet has been posted.'});
    res.redirect('/api/twitter');
  });
};


/**
 * GET /api/stripe
 * Stripe API example.
 * Delete after Stripe Integration into Account page
 */
exports.getStripe = function(req, res) {
  stripe = require('stripe')(process.env.STRIPE_SKEY);

  res.render('api/stripe', {
    title: 'Stripe API',
    publishableKey: process.env.STRIPE_PKEY
  });
};

/**
 * POST /api/stripe
 * Make a payment.
 */
exports.postStripe = function(req, res, next) {
  stripe = require('stripe')(process.env.STRIPE_SKEY);
  var stripeToken = req.body.stripeToken;
  var stripeEmail = req.body.stripeEmail;
  var certType = req.body.certType;
  var price = req.body.price;
  var charge = stripe.charges.create({
    amount: price,
    currency: 'usd',
    source: stripeToken,
    description: (certType || 'Donation') 
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      req.flash('errors', { msg: 'Your card has been declined.' });
      return res.redirect('/account');
    }
    req.flash('success', { msg: 'Your card has been charged successfully.  You may need to refresh your browser to to see your updated payment status.' });
    res.redirect('/account');
  });
};

/**
 * GET /api/stripe/charges
 * Get Stripe Charge Activity (Webhooks)
 */
exports.postStripeCharges = function(req, res, next) {
  stripe = require('stripe')(process.env.STRIPE_SKEY);

  // Retrieve the request's body from Stripe
  var event_json = req.body;

  // Send status 200 to Stripe before processing data
  res.sendStatus(200);

  // Set values to update user model paid + paid_on
  var today = new Date();
  var Cuemail = event_json.data.object.source.name;
  var certType = event_json.data.object.description;

  // Set value of cert to update
  if (certType == 'Certified Personal Trainer')
    var certInitials = 'cpt';
  else if (certType == 'Certified Master Trainer')
    var certInitials = 'cmt';
  else if (certType == 'Certified Nutrition Specialist')
    var certInitials = 'cns';
  else if (certType == 'Certified TESTING')
    var certInitials = 'test';

  var CurCert = ('certs.' + certInitials);
  var CurCertPaid = (CurCert + '.paid');
  var CurCertPaid_On = (CurCert + '.paid_on');
  var update = {};
  update[CurCertPaid] = true;
  update[CurCertPaid_On] = today;



  // Create and save payment record
  var payment = new Payment({
    event_Obj_id: event_json.data.object.id,
    event_type: event_json.type,
    cert: event_json.data.object.description,
    amount: event_json.data.object.amount,
    user_email: event_json.data.object.source.name,
  });
  payment.save(function(err) {
    if (err)
      return next(err);
    //else
     // return next();
  });

  // if charge succeeded update paid = true + paid_on date
  if (event_json.type == 'charge.succeeded') {
    User.findOneAndUpdate(
      {'email': Cuemail},
      { $set: update },
      {new: true, runValidators: true},
      function(err, updated_user) {
        if (err)
          console.log(err);
        else {
          updated_user.save();
        }
      }
    ); // End findOneAndUpdate()

  } // end if 'charge.secceded'

};


/**
 * GET /api/linkedin
 * LinkedIn API example.
 */
exports.getLinkedin = function(req, res, next) {
  Linkedin = require('node-linkedin')(process.env.LINKEDIN_ID, process.env.LINKEDIN_SECRET, process.env.LINKEDIN_CALLBACK_URL);

  var token = _.find(req.user.tokens, { kind: 'linkedin' });
  var linkedin = Linkedin.init(token.accessToken);
  linkedin.people.me(function(err, $in) {
    if (err) {
      return next(err);
    }
    res.render('api/linkedin', {
      title: 'LinkedIn API',
      profile: $in
    });
  });
};


/**
 * GET /api/paypal
 * PayPal SDK example.
 */
exports.getPayPal = function(req, res, next) {
  paypal = require('paypal-rest-sdk');

  paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_ID,
    client_secret: process.env.PAYPAL_SECRET
  });

  var paymentDetails = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: '/api/paypal/success',
      cancel_url: '/api/paypal/cancel'
    },
    transactions: [{
      description: 'Hackathon Starter',
      amount: {
        currency: 'USD',
        total: '1.99'
      }
    }]
  };

  paypal.payment.create(paymentDetails, function(err, payment) {
    if (err) {
      return next(err);
    }
    req.session.paymentId = payment.id;
    var links = payment.links;
    for (var i = 0; i < links.length; i++) {
      if (links[i].rel === 'approval_url') {
        res.render('api/paypal', {
          approvalUrl: links[i].href
        });
      }
    }
  });
};

/**
 * GET /api/paypal/success
 * PayPal SDK example.
 */
exports.getPayPalSuccess = function(req, res) {
  var paymentId = req.session.paymentId;
  var paymentDetails = { payer_id: req.query.PayerID };
  paypal.payment.execute(paymentId, paymentDetails, function(err) {
    if (err) {
      res.render('api/paypal', {
        result: true,
        success: false
      });
    } else {
      res.render('api/paypal', {
        result: true,
        success: true
      });
    }
  });
};

/**
 * GET /api/paypal/cancel
 * PayPal SDK example.
 */
exports.getPayPalCancel = function(req, res) {
  req.session.paymentId = null;
  res.render('api/paypal', {
    result: true,
    canceled: true
  });
};


exports.getFileUpload = function(req, res, next) {
  res.render('api/upload', {
    title: 'File Upload'
  });
};

exports.postFileUpload = function(req, res, next) {
  req.flash('success', { msg: 'File was uploaded successfully.'});
  res.redirect('/api/upload');
};

