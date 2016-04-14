var User = require('../models/user');
var contactController = require('./contact');

// GET Exam pages

exports.getCpt = function(req, res) {
  res.render('exams/cpt_exam');
}
exports.getPracticeCpt = function(req, res) {
  res.render('exams/practice_cpt_exam');
}
exports.getCmt = function(req, res) {
  res.render('exams/cmt_exam');
}
exports.getPracticeCmt = function(req, res) {
  res.render('exams/practice_cmt_exam');
}
exports.getCns = function(req, res) {
  res.render('exams/cns_exam');
}
exports.getPracticeCns = function(req, res) {
  res.render('exams/practice_cns_exam');
}
exports.getTest = function(req, res) {
  res.render('exams/test_exam');
}
exports.getPracticeTest = function(req, res) {
  res.render('exams/practice_test_exam');
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
  var certTitle = 'Certified Personal Trainer';
  var Cuname = req.user.profile.name;
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
      contactController.emailUserExam(Cuemail, Cuname, certTitle, newScore, today);
      req.flash('success', { msg: 'Success! Your exam score has been submitted.' });
      contactController.emailUserExam(Cuemail, certTitle, newScore, today);
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
  var certTitle = 'Certified Master Trainer';
  var Cuname = req.user.profile.name;
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
      contactController.emailUserExam(Cuemail, Cuname, certTitle, newScore, today);
      req.flash('success', { msg: 'Success! Your exam score has been submitted.' });
      contactController.emailUserExam(Cuemail, certTitle, newScore, today);
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
  var certTitle = 'Certified Nutrition Specialist';
  var Cuname = req.user.profile.name;
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
      contactController.emailUserExam(Cuemail, Cuname, certTitle, newScore, today);
      req.flash('success', { msg: 'Success! Your exam score has been submitted.' });
      res.redirect('/account');
    } 
  ); // End findOneAndUpdate()
};

// ==== SUBMIT TEST EXAM ====
exports.submitTest = function(req, res) {
  var Cuser = req.user;
  var Cu_id = req.user._id;
  var Cuemail = Cuser.email;
  var hScore = Cuser.certs.test.score;
  var newScore = req.body.score;
  var Cpassed_on = (Cuser.certs.test.passed_on == null) ? null : Cuser.certs.test.passed_on;
  var today = new Date();
  var certTitle = 'Certified TEST Trainer';
  var Cuname = req.user.profile.name;
  User.findOneAndUpdate(
    {'email': Cuemail},
    { $set: { 'certs.test.verify_id': Cu_id + 'test',
              'certs.test.score' : (newScore > hScore) ? newScore : hScore,
              'certs.test.passed' : (newScore > 69 | hScore > 69) ? true : false,
              'certs.test.passed_on' : 
                (newScore > 69 && Cpassed_on == null) ? today : Cpassed_on 
      },
      $push: { 'certs.test.attempts': today }
    },
    {new: true, runValidators: true},
    function(err, updated_user) {
      if (err) console.log(err);
      //res.json(updated_user);
      contactController.emailUserExam(Cuemail, Cuname, certTitle, newScore, today);
      req.flash('success', { msg: 'Success! Your exam score has been submitted.' });
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
