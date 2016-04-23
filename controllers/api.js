//var _ = require('lodash'); // move to Chopped api controller
//var async = require('async'); // move to Chopped api controller
var Payment = require('../models/payment');
var User = require('../models/user');
var stripe;


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
 *  POST /api/stripe/charges (Webhooks)
 * POST from Stripe Charge Activity After charge is complete 
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

