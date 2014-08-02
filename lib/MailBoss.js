var _ = require('lodash');
var S = require('string');
var nodeMailer = require("nodemailer");
var secrets = require('../config/secrets');

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
    text: 'MOO'
  }
}

MailBoss.prototype.send = function(mailOptions, callback) {
  var sendOptions = _.extend(this.defaults, mailOptions);
  this.transporter.sendMail(sendOptions, function(err, info) {
    callback(err, info);
  });
}



module.exports = MailBoss;


