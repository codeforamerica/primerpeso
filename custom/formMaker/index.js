var forms = require('forms')
  , fields = forms.fields
  , widgets = forms.widgets
  , validators = forms.validators
  , _ = require('underscore')
  , S = require('string');

function getFormField(path, eachFieldParams) {
	var _field = null;
	// If exclusion is asked for, exclude.
	if (path.options.exclude)
		return _field;

	// Provide some sane defaults.
  var fieldParams = _.extend({

  }, eachFieldParams);


  var fieldOptions = path.options;
  fieldOptions.type = path.instance;
  fieldOptions.name = path.path;
  /*if (fieldOptions.type == undefined) {
  	console.log(path.path);
  	console.log(path.instance);
  	console.log(path.options);
  }*/

  fieldOptions.header = fieldOptions.label;
  // Let's do some logic to get the field type going.
  if (!fieldOptions.widget) {
    // Let's default to something here
    if (fieldOptions.type == 'Number') {
      fieldOptions.widget = 'number';
    }
    else if (fieldOptions.type == 'String') {
      fieldOptions.widget = 'text';
    }
  }
  // Prep choices on multiple choice objects.
  if (fieldOptions.choices) {
    var choicesObject = {};
    _.each(fieldOptions.choices, function(element, index) {
      choicesObject[element] = element;
    });
    fieldOptions.choices = choicesObject;
  }
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
  for (var pathName in paths) {
    var path = paths[pathName];
    //console.log(pathName);
    var field = getFormField(path, formOptions.eachFieldParams);
    form.fields[pathName] = field;
  }
  /*for (var virtName in virtuals) {
    var virt = virtuals[virtName];
    virt.path = virtName;
    var field = get_field(virt, form_name, form_category);
    if (field)
      params = _.extend(params, field);
  }
  params = _.extend({}, params, extra_params);*/
  //var form = forms.create(params);
  return form;
}

module.exports.fields = fields;
module.exports.widgets = widgets;
module.exports.validators = validators;
module.exports.createForm = function (params, extra_params) {
  params = _.extend({}, params, extra_params);
  var form = forms.create(params)
  return form;
}
