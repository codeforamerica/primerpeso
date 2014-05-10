var _ = require('underscore');
var forms = require('forms');
var fields = forms.fields;
var validators = forms.validators;
var widgets = forms.widgets;
var render = forms.render;

var formHelper = exports;

formHelper.createMultiForm = function(options) {
  var stepForms = _.map(options.steps, function(step, index) {
    return {
      stepTitle: step.stepTitle,
      stepFields: forms.create(formHelper.bootstrapifyFieldObjects(step.stepFields))
    }
  });
  this.stepForms = stepForms;
  return this;
};

formHelper.bootstrapifyFieldObjects = function(fieldObjects) {
  _.each(fieldObjects, function(field, index) {
    if (field.widget.type == 'multipleRadio') {
      console.log(field);
    }
  });
    return fieldObjects;
};

formHelper.renderMultiForm = function() {
  var renderedHTML = '';
  _.each(this.stepForms, function(stepForm, index) {
    renderedHTML += '<h3>' + stepForm.stepTitle + '</h3>';
    renderedHTML += '<fieldset>';
    renderedHTML += stepForm.stepFields.toHTML(formHelper.processField);
    renderedHTML += '</fieldset>';
  });

  return renderedHTML;
}


formHelper.processField = function(name, object) {
  object.widget.classes = object.widget.classes || [];
  //object.widget.classes.push('form-control');

  //var label = '<label for="id_' + name + '">' + object.labelHTML(name) + '</label>';
  //var error = object.error ? '<div class="alert alert-error">' + object.error + '</div>' : '';
  var widget = object.widget.toHTML(name, object);
  return '<div class="form-group">' + widget + '</div>';
}

