var path = require('path');
var _ = require('lodash');
var S = require('string');
var nodeMailer = require("nodemailer");
var Promise = require('bluebird');
var secrets = require('../config/secrets');
var templatesDir   = path.join(__dirname, '../email_templates');
var emailTemplatesAsync = Promise.promisify(require('email-templates'))
//Promise.promisifyAll(nodeMailer.Transport.prototype);

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
  transporter.sendMailAsync = Promise.promisify(transporter.sendMail);
  this.transporter = transporter;
  this.defaults = {
    to: secrets.mailTo.split(','),
    from: secrets.mailFrom,
    subject: 'I Should Have Set A Subject',
    locals: {}
  }
}

MailBoss.prototype.dispatch = function(mailOptionsSet, renderOnly) {
  var self = this;
  mailOptionsSet = _.isArray(mailOptionsSet) ? mailOptionsSet : new Array(mailOptionsSet);
  return emailTemplatesAsync(templatesDir).then(function(templateFn) {
    var emailPromises = [];
    optionSetsByTemplate = _.groupBy(mailOptionsSet, function(mailOptions) {
      return mailOptions.template;
    });
    _.each(optionSetsByTemplate, function(templateMailOptionsSet, templateName) {
      _.each(templateMailOptionsSet, function(templateMailOptions) {
        emailPromises.push(self.buildSendOptions(templateMailOptions, templateFn, templateName)
          .then(function(sendOptions) {
              return renderOnly ? sendOptions.html : self.sendMessage(sendOptions);
          }));
      });
    });
    return Promise.all(emailPromises);
  });
};

MailBoss.prototype.buildSendOptions = function(mailOptions, templateFn, templateName) {
  var self = this;
  var sendOptions = {};
  var passedOptions = _.cloneDeep(mailOptions);
  var clonedDefaults = _.cloneDeep(this.defaults);
  passedOptions.locals = _.extend(clonedDefaults.locals, passedOptions.locals);

  // If specified include default receivers.
  if (passedOptions.sendToDefaults === true)
    passedOptions.to = _.union(clonedDefaults.to, passedOptions.to);

  sendOptions = _.extend(clonedDefaults, passedOptions);
  // Compile text and html parameters.
  return Promise.promisify(templateFn)(templateName, sendOptions.locals).spread(function(html, text) {
    return sendOptions = _.extend(sendOptions, {
      html: html, text: text, to: sendOptions.to.join(',')
    });
  });
}

MailBoss.prototype.sendMessage = function(sendOptions) {
  return this.transporter.sendMailAsync(sendOptions);
}

module.exports = MailBoss;


