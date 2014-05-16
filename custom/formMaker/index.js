
var _ = require('underscore')
var S = require('string');

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
  return S(fieldOptions.directName).humanize().s;
}

/**
 * Build the choices object of labels and values
 */
var buildChoices = function(fieldOptions, fieldParams) {
  var choicesList = fieldParams.getChoicesMethod(fieldOptions);
  var choices = {};
  _.each(choicesList, function(element, index) {
    choices[element] = element;
  });

  return choices;
}

/**
 * Get the array that contains the list of choices.
 */
var getChoices = function(fieldOptions) {
  var choices = fieldOptions.choices || [];
  if (_.isEmpty(choices)) {
    if (_.isFunction(choices))
      choices = choices(fieldOptions);
  }
  return choices;
}

/**
 * Build the form field
 */
function getFormField(path, eachFieldParams) {
	// Provide some sane defaults.
  var fieldParams = _.extend({
    // TODO this could be used for mapping conditions from schema like string to field, etc.
    getWidgetMethod: getWidget,
    getChoicesMethod: getChoices,
    buildChoicesMethod: buildChoices,
    getLabelMethod: getLabel
  }, eachFieldParams);

  // Adjust for arrays.
  // Mongoose schema arrays hold a caster object which we need to get to --
  // Cuz that's where the honey is.
  var fieldOptions = _.isEmpty(path.caster) ? path.options : path.caster.options;
  // @TODO fix me.
  // Override any eachFieldParams with stuff directly coming from the field.
  // @TODO is this really needed or just bullshit?
  _.extend(fieldParams, fieldOptions.fieldParams);

  fieldOptions.name = path.path;
  fieldOptions.directName = path.path;
  // Give direct name -- the element key directly.
  if (S(path.path).contains('.')) {
    fieldOptions.directName = path.path.split('.').pop();
  }

  fieldOptions.label = fieldParams.getLabelMethod(fieldOptions);
  _.extend(fieldOptions, {
    type: path.instance,
    header: fieldOptions.label // @TODO -- No me gusta esto
  });

  // Get Field Type
  fieldOptions.widget = fieldParams.getWidgetMethod(fieldOptions)
  // Get Choices
  fieldOptions.choices = fieldParams.buildChoicesMethod(fieldOptions, fieldParams);

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

