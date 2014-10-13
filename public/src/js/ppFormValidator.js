var _ = require('lodash');
var Validator = require('validator');

// Put some custom validators in.

Validator.extend('notEmpty', function(str) {
  return !str.match(/^[\s\t\r\n]*$/);
});

Validator.extend('isPhone', function(str) {
  if (str.match(/\d{10}/))
    return str;
  return false;
});

function FormValidator() {
  this.validator = Validator;
  this.validationFailures = [];
  this.validatorMessages = {
    notEmpty: "Por favor completa el campo",
    isNumeric: "Por favor entrar solo numero, sin simbolo",
    isEmail: "Por favor, entrar solo email",
    isPhone: "Por favor, entra numero telephone en formato como 1234567890"
  }
}

FormValidator.prototype.getMessageForValidator = function(field, validatorName) {
  return this.validatorMessages[validatorName];
}

FormValidator.prototype.validateFields = function(fields) {
  _.each(fields, function(field, index) {
    this.validateValue(field);
  }, this);
 return this.validationFailures;
}

FormValidator.prototype.getValue = function(field) {
  var val = '';
  if (field.widget === 'select' || field.widget === 'multiSelect')
    val = $('select[name="' + field.name + '"]').select2("val");
  else if (field.widget === 'checkbox' || field.widget == 'radio')
    val = $('input[name="'+ field.name +'"]:checked').attr('value');
  else if (field.widget === 'textArea')
    val = $('textarea[name="' + field.name + '"]').val();
  else if (field.widget === 'arrayTextField')
    val = $('input[name="' + field.name + '[]"]').val();
  else
    val = $('input[name="' + field.name + '"]').val();

  return val;
}

FormValidator.prototype.validateValue = function(field) {
  var val = this.getValue(field);
  var validated = true;
  if (field.required === true || field.allowNull === false) {
    if (!this.validator.notEmpty(val)) {
      this.validationFailures.push({
        fieldName: field.name,
        message: this.getMessageForValidator(field, 'notEmpty')
      });
    }
  }
  if (field.validate) {
    _.each(field.validate, function(validatorVal, validatorName) {
      if (_.isBoolean(validatorVal) || _.isString(validatorVal)) {
        if (!validatorVal === this.validator[validatorName](val)) {
          this.validationFailures.push({
            fieldName: field.name,
            message: this.getMessageForValidator(field, validatorName)
          });
        }
      }
    }, this)
  }
}

exports = module.exports = FormValidator;
