var path = require('path');
var _ = require('lodash');
var S = require('string');
var nodeMailer = require("nodemailer");
var secrets = require('../config/secrets');
var templatesDir   = path.join(__dirname, '../email_templates');
var emailTemplates = require('email-templates');

function MailBoss() {
  var transporter = null;

  // Use stubmailer for travis envs.
  if (secrets.mailHandler === 'stub') {
    console.log('SOON TO BE STUB HANDLER');
  }
  // Use Mandrill otherwise.
  else {
    transporter = nodeMailer.createTransport({
      host: 'smtp.mandrillapp.com',
      port: 587,
      debug: true,
      auth: {
        user: secrets.mandrill.user,
        pass: secrets.mandrill.apiKey
      }
    });
  }
  // TODO -- Implement MailDev for local mail testing.
  this.transporter = transporter;
  this.defaults = {
    to: secrets.mailTo,
    from: secrets.mailFrom,
    subject: 'I Should Have Set A Subject',
    locals: {}
  }
}

MailBoss.prototype.send = function(mailOptions, callback) {
  mailOptions.locals = _.extend(this.defaults.locals, mailOptions.locals);
  var sendOptions = _.extend(this.defaults, mailOptions);
  var self = this;
  // Compile text and html parameters.
  // TODO -- Promises
  emailTemplates(templatesDir, function(err, template) {
    if (err) {
      console.log(err);
      throw err;
    }

    template('sendlead-agency', sendOptions.locals, function(err, html, text) {
      callback(err, html);
      if (err) {
	console.log(err);
	throw err;
      }
      sendOptions = _.extend(sendOptions, {
	html: html,
	text: text,
      })
      //self.transporter.sendMail(sendOptions, function(err, info) {
      //  callback(err, info);
      //});
    });

  });
}



module.exports = MailBoss;


