var sendgrid  = require('sendgrid')(process.env.SENDGRID_API_KEY);

/**
 * POST /api/sendgrid
 * SendGrid Webhook route for event reporting
 */
exports.sendGridHook = function(req, res) {
  res.sendStatus(200);

};


/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = function(req, res) {
  res.render('contact', {
    title: 'Contact | PT University Support',
    desc: "Contact PT University"
  });
};

/**
 * POST /contact
 * Send User contact form via SendGrid.
 */
exports.postContact = function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }

  var email       = new sendgrid.Email();
  email.to        = 'ptuteam@ptuniversity.org',
  email.from      = req.body.email,
  email.subject   = req.body.subject,
  email.text      = req.body.message,

  sendgrid.send(email, function(err, json) {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/contact');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/contact');
  });
};

/**
 * Send New User Welcome Email via SendGrid.
 */
exports.emailNewUser = function(user_email) {

  var email       = new sendgrid.Email();
  email.to        = user_email,
  email.from      = 'ptuteam@ptuniversity.org',
  email.subject   = 'Welcome to PT University',
  email.html      = '_',
  email.addSubstitution('-user_email-', user_email);
  email.setFilters({
    'templates': {
        'settings': {
            'enable': 1,
            'template_id' : 'b8370713-1d2f-4b46-8705-d00adc13abb2',
        }
    }
  });

  sendgrid.send(email, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });

};

/**
 * Send User Exam Results via SendGrid.
 */
exports.emailUserExam = function(Cuemail, Cuname, certTitle, newScore, today) {

  var email       = new sendgrid.Email();
  email.to        = Cuemail,
  email.from      = 'ptuteam@ptuniversity.org',
  email.subject   = certTitle + ' results',
  email.html      = '_',
  email.addSubstitution('-certTitle-', certTitle);
  email.addSubstitution('-Cuname-', Cuname);
  email.addSubstitution('-newScore-', newScore);
  email.addSubstitution('-date-', today);
  email.setFilters({
    'templates': {
        'settings': {
            'enable': 1,
            'template_id' : '4748d9b8-570b-4f65-8441-ea2fef54ea39',
        }
    }
  });

  sendgrid.send(email, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });

};

  /* available sendgrid email params
  var params = {
    smtpapi:  new sendgrid.smtpapi(),
    to:       [],
    toname:   [],
    from:     '',
    fromname: '',
    subject:  '',
    text:     '',
    html:     '',
    bcc:      [],
    cc:       [],
    replyto:  '',
    date:     '',
    files: [
      {
        filename:     '',           // required only if file.content is used.
        contentType:  '',           // optional
        cid:          '',           // optional, used to specify cid for inline content
        path:         '',           //
        url:          '',           // == One of these three options is required
        content:      ('' | Buffer) //
      }
    ],
    file_data:  {},
    headers:    {}
  }; 
 */

/* ----- REPLACED WITH SENDGRID DIRECTLY -----
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});
*/
/* -------NODEMAILER (DON'T DELETE)---------
  var from = req.body.email;
  var name = req.body.name;
  var body = req.body.message;
  var to = 'ptuteam@ptuniversity.org';
  var subject = 'Contact Form | PT University';

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/contact');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/contact');
  });
 */
