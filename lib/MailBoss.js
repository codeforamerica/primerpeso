var _ = require('lodash');
var S = require('string');
var nodeMailer = require("nodemailer");
var secrets = require('../config/secrets');

function MailBoss() {
  var transporter = null;

  // Use Mandrill for prod envs.
  if (secrets.env == 'production') {
    console.log('PROD');
  }
  // Use MailDev for dev envs.
  else if (secrets.mailDev === 'MailDev') {
    console.log('MailDev');
    transporter = nodeMailer.createTransport({
      port: 1025,
      host: 'localhost',
      debug: true,
      maxConnections: 5,
      maxMessages: 10
    });
  }
  else if (secrets.mailDev === 'Mandrill') {
    console.log('Mandrill Dev Mode');
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

  // Use stubmailer for travis envs.
  else {
    console.log('TEST');
  }
  this.transporter = transporter;
  this.defaults = {
    to: secrets.mailFrom,
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


