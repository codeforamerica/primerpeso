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
  var val = '';
  if (field.widget === 'select' || field.widget === 'multiSelect')
    val = $('select[name="' + field.name + '"]').select2("val");
  else if (field.widget === 'checkbox' || field.widget == 'radio')
    val = $('input[name="'+ field.name +'"]:checked').attr('value');
  else
    val = $('input[name="'+ field +'"]').val();

  console.log(val);
}

exports = module.exports = FormValidator;
