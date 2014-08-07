var _ = require('lodash');
var Validator = require('validator');

// Put some custom validators in.

Validator.extend('notEmpty', function(str) {
  return !str.match(/^[\s\t\r\n]*$/);
});

function FormValidator() {
  this.validator = Validator;
}

FormValidator.prototype.validateFields = function(fields) {
  console.log(fields);
  _.each(fields, function(field, index) {
    this.getValue(field);
  }, this);
}

FormValidator.prototype.getValue = function(field) {
  console.log(field);
  var val = '';
  if (field.widget === 'select' || field.widget === 'multiSelect') {
    var name = 'select[name="' + field.name + '"]';
    console.log(name);
    val = $(name).select2("val");
  }

  console.log(val);
}

exports = module.exports = FormValidator;
