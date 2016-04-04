var User = require('../models/user');

// GET Exam pages

exports.getCpt = function(req, res) {
  res.render('cpt_exam');
}
exports.getCmt = function(req, res) {
  res.render('cmt_exam');
}
exports.getCns = function(req, res) {
  res.render('cns_exam');
}


//------- Submit Exam Scores Update Score -------

// ==== SUBMIT CPT EXAM ====
exports.submitCpt = function(req, res) {
  var Cuser = req.user;
  var Cu_id = req.user._id;
  var Cuemail = Cuser.email;
  var hScore = Cuser.certs.cpt.score;
  var newScore = req.body.score;
  var Cpassed_on = (Cuser.certs.cpt.passed_on == null) ? null : Cuser.certs.cpt.passed_on;
  var today = new Date();
  User.findOneAndUpdate(
    {'email': Cuemail},
    { $set: { 'certs.cpt.verify_id': Cu_id + 'cpt',
              'certs.cpt.score' : (newScore > hScore) ? newScore : hScore,
              'certs.cpt.passed' : (newScore > 69 | hScore > 69) ? true : false,
              'certs.cpt.passed_on' : 
                (newScore > 69 && Cpassed_on == null) ? today : Cpassed_on 
      },
      $push: { 'certs.cpt.attempts': today }
    },
    {new: true, runValidators: true},
    function(err, updated_user) {
      if (err) console.log(err);
      //res.json(updated_user);
      res.redirect('/account');
    } 
  ); // End findOneAndUpdate()
};

// ==== SUBMIT CMT EXAM ====
exports.submitCmt = function(req, res) {
  var Cuser = req.user;
  var Cu_id = req.user._id;
  var Cuemail = Cuser.email;
  var hScore = Cuser.certs.cmt.score;
  var newScore = req.body.score;
  var Cpassed_on = (Cuser.certs.cmt.passed_on == null) ? null : Cuser.certs.cmt.passed_on;
  var today = new Date();
  User.findOneAndUpdate(
    {'email': Cuemail},
    { $set: { 'certs.cmt.verify_id': Cu_id + 'cmt',
              'certs.cmt.score' : (newScore > hScore) ? newScore : hScore,
              'certs.cmt.passed' : (newScore > 69 | hScore > 69) ? true : false,
              'certs.cmt.passed_on' : 
                (newScore > 69 && Cpassed_on == null) ? today : Cpassed_on 
      },
      $push: { 'certs.cmt.attempts': today }
    },
    {new: true, runValidators: true},
    function(err, updated_user) {
      if (err) console.log(err);
      //res.json(updated_user);
      res.redirect('/account')
    } 
  ); // End findOneAndUpdate()
};

// ==== SUBMIT CNS EXAM ====
exports.submitCns = function(req, res) {
  var Cuser = req.user;
  var Cu_id = req.user._id;
  var Cuemail = Cuser.email;
  var hScore = Cuser.certs.cns.score;
  var newScore = req.body.score;
  var Cpassed_on = (Cuser.certs.cns.passed_on == null) ? null : Cuser.certs.cns.passed_on;
  var today = new Date();
  User.findOneAndUpdate(
    {'email': Cuemail},
    { $set: { 'certs.cns.verify_id': Cu_id + 'cns',
              'certs.cns.score' : (newScore > hScore) ? newScore : hScore,
              'certs.cns.passed' : (newScore > 69 | hScore > 69) ? true : false,
              'certs.cns.passed_on' : 
                (newScore > 69 && Cpassed_on == null) ? today : Cpassed_on 
      },
      $push: { 'certs.cns.attempts': today }
    },
    {new: true, runValidators: true},
    function(err, updated_user) {
      if (err) console.log(err);
      //res.json(updated_user);
      res.redirect('/account');
    } 
  ); // End findOneAndUpdate()
};

// ------------- Verify Certifications --------------
// Verify Certification form
exports.verifyCert = function(req, res) {
  var name = req.body.certType.concat('.verify_id');
  var value = req.body.req_verify_id;
  var query = {};
  query[name] = value;

  var thisCert = req.body.certType;
  var justCert = thisCert.slice(6);
  var proj = {};
  proj[thisCert] = 1;
  proj['profile.name'] = 1;
  proj['_id'] = 0;
  User.findOne(query,
               proj,
               function (err, user_info) {
      if (err) console.log(err);
      if (user_info) {
        res.render('verified.jade',
                   { username: user_info.profile.name,
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
};
