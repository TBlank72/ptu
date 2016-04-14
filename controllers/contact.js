var sendgrid  = require('sendgrid')(process.env.SENDGRID_API_KEY);

/**
 * GET /api/sendgrid
 * test route. Delete after all emails are working.
 */
exports.sendGrid = function(req, res) {

  var email       = new sendgrid.Email();
  email.to        = 'toddmblankenship@yahoo.com',
  email.from      = 'ptuteam@ptuniversity.org',
  email.subject   = 'new sendgrid.Email',
  email.text      = 'some body text',
  email.addSubstitution('-user_email-', 'SUBSTITUTION');
  email.setFilters({
    'templates': {
        'settings': {
            'enable': 1,
            'template_id' : 'b8370713-1d2f-4b46-8705-d00adc13abb2',
        }
    }
  });
  /* available params
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

  sendgrid.send(email, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });
};


/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = function(req, res) {
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
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

  var to = 'ptuteam@ptuniversity.org';
  var from = req.body.email;
  var name = req.body.name;
  var body = req.body.message;
  var subject = 'Contact Form | PT University';

  var payload   = {
    to      : to,
    from    : from,
    subject : subject,
    text    : body
  }

  sendgrid.send(payload, function(err, json) {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/contact');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/contact');
  });
};

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
