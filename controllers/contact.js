var secrets = require('../config/secrets');
var MailBoss = require('../lib/MailBoss');
var mailBoss = new MailBoss();
var Promise = require('bluebird');

module.exports = function(app) {
  app.get('/contact', getContact);
  app.post('/contact', postContact);
};

/**
 * GET /contact
 * Contact form page.
 */

function getContact(req, res) {
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 * @param email
 * @param name
 * @param message
 */

function postContact(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }
  mailBoss.send({
    from: req.body.email,
    subject: "PrimerPeso Contact Form",
    text: req.body.message,
    }, function(err, info) {
      console.log(err);
      console.log(info);
      if (err) {
        req.flash('errors', { msg: err.message });
        return res.redirect('/contact');
      }
      req.flash('success', { msg: 'Email has been sent successfully!' });
      res.redirect('/contact');
  });

};
