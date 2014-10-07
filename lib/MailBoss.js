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
    to: secrets.mailTo.split(','),
    from: secrets.mailFrom,
    subject: 'I Should Have Set A Subject',
    locals: {}
  }
}

MailBoss.prototype.dispatch = function(mailOptionsSet, callback) {
  var self = this;
  mailOptionsSet = _.isArray(mailOptionsSet) ? mailOptionsSet : new Array(mailOptionsSet);
  emailTemplates(templatesDir, function(err, template) {
    if (err) {
      console.log(err);
      throw err;
    }
    _.each(mailOptionsSet, function(mailOptions) {
      sendMessage(mailOptions, self, template);
    });
    callback();
  }); // emailTemplates;
};

var sendMessage = function(mailOptions, mailBossInstance, template) {
  var sendOptions = {};
  var passedOptions = _.cloneDeep(mailOptions);
  var clonedDefaults = _.cloneDeep(mailBossInstance.defaults);
  passedOptions.locals = _.extend(clonedDefaults.locals, passedOptions.locals);
  // If specified include default receivers.
  if (passedOptions.sendToDefaults === true)
    passedOptions.to = _.union(clonedDefaults.to, passedOptions.to);

  sendOptions = _.extend(clonedDefaults, passedOptions);
  console.log('omit locals');
  console.log(_.omit(sendOptions, ['locals']));
  // Compile text and html parameters.
  // TODO -- Promises
  template(sendOptions.template, sendOptions.locals, function(err, html, text) {
    //callback(err, html);
    if (err) {
      console.log(err);
      throw err;
    }
    sendOptions = _.extend(sendOptions, {
      html: html,
      text: text,
      to: sendOptions.to.join(',')
    })
    console.log('SENDING MAIL');
    console.log(sendOptions.to);
    console.log(sendOptions.subject);
    //MailBoss.transporter.sendMail(sendOptions);
    //self.transporter.sendMail(sendOptions, function(err, info) {
    //  callback(err, info);
    //});
  });
}
/*var send = function(mailOptions, callback) {
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

    template(sendOptions.template, sendOptions.locals, function(err, html, text) {
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
}*/



module.exports = MailBoss;


