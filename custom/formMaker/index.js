
var _ = require('underscore')
var S = require('string');

/*var forms = require('forms');
var fields = forms.fields;
var widgets = forms.widgets;
var validators = forms.validators;*/

// Default methods for doing shit.

var getWidget = function(fieldOptions) {
  var widget = fieldOptions.widget || null;

  if (!fieldOptions.widget) {
    // Let's default to something here
    if (fieldOptions.type == 'Number')
      widget = 'number';

    else if (fieldOptions.type == 'String')
      widget = 'text';
  }
  return widget;
}

var getLabel = function(fieldOptions) {
  // If label has been passed, return it.
  var label = fieldOptions.label || '';
  if (!S(label).isEmpty()) {
    return fieldOptions.label;
  }
  if (S(fieldOptions.name).contains('.')) {
    return S(fieldOptions.name.split('.').pop()).humanize().s;
  }
  return S(fieldOptions.name).humanize().s;
}

/**
 * Build the choices object of labels and values
 */
var buildChoices = function(choicesList) {
  var choices = {};
  // Choices list should always be coming in as ARRAY!
  _.each(choicesList, function(element, index) {
    // TODO -- account for callbacks given on object
    choices[element] = element;
  });

  return choices;
}

/**
 * Get the array that contains the list of choices.
 */
var getChoices = function(fieldOptions) {
  var choices = fieldOptions.choices || [];
  if (_.isFunction(choices))
    choices = choices(fieldOptions);

  return choices;
}

function getFormField(path, eachFieldParams) {
	// Provide some sane defaults.
  var fieldParams = _.extend({
    // TODO this could be used for mapping conditions from schema like string to field, etc.
    getWidgetMethod: getWidget,
    getChoiceListMethod: getChoices,
    buildChoicesMethod: buildChoices,
    getLabelMethod: getLabel
  }, eachFieldParams);

  // Adjust for arrays.
  // Mongoose schema arrays hold a caster object which we need to get to --
  // Cuz that's where the honey is.
  var fieldOptions = _.isEmpty(path.caster) ? path.options : path.caster.options;
  // @TODO fix me.
  fieldOptions.name = path.path;
  fieldOptions.label = fieldParams.getLabelMethod(fieldOptions);
  console.log(fieldOptions.label);
  _.extend(fieldOptions, {
    type: path.instance,
    header: fieldOptions.label // @TODO -- No me gusta esto
  });

  // Get Field Type
  fieldOptions.widget = fieldParams.getWidgetMethod(fieldOptions)
  // Get Choices
  var choiceList = fieldParams.getChoiceListMethod(fieldOptions);
  fieldOptions.choices = fieldParams.buildChoicesMethod(choiceList);

  return fieldOptions;
}



module.exports.create = function (schema, extraParams) {
  var paths = schema.paths;
  var virtuals = schema.virtuals;
  var params = {};
  var form = {fields: {}};
  // Form Wide Defaults.
  var formOptions = _.extend({
    eachFieldParams: {}
  }, extraParams);
  _.each(paths, function(path, pathName) {
    var field = getFormField(path, formOptions.eachFieldParams);
    form.fields[pathName] = field;
  })
  // @TODO -- handle virtuals as well.
  return form;
}

