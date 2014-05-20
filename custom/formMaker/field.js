var _ = require('underscore')
var S = require('string');

// Constructor
function Field(path, eachFieldOptions) {
  // always initialize all instance properties
  var schemaOptions = _.isEmpty(path.caster) ?
    path.options :
    path.caster.options;


  // Set initially to be used by the getter functions.
  this.options = _.extend({
    name: path.path,
    type: path.instance,
  }, _.omit(eachFieldOptions, 'methods'),
     _.omit(schemaOptions, 'methods'));

  // TODO -- this binding is weird.  need to look again
  this.methods = _.extend({
    getWidgetMethod: getWidget,
    getChoicesMethod: getChoices,
    buildChoicesMethod: buildChoices,
    getLabelMethod: getLabel
  }, eachFieldOptions.methods, schemaOptions.methods);

  // Get all the generated stuff, and let schema options override it..
  this.options = _.extend({
    label: this.methods.getLabelMethod(this),
    header: this.methods.getLabelMethod(this), // @TODO -- No me gusta esto
    // Get Field Type
    widget: this.methods.getWidgetMethod(this),
    // Get Choices
    choices: this.methods.buildChoicesMethod(this),
  }, schemaOptions);
}

// class methods
Field.prototype.getName = function(use) {
  if (use && S(this.options.name).contains('.')) {
    var brokenPath = this.options.name.split('.');
    if (use == 'direct') {
      return brokenPath.pop();
    }
    else {
      var name = '';
      _.each(brokenPath, function(element, index){
        name += index == 0 ? element : "[" + element + "]";
      });
      return name;
    }
  }
  return this.options.name;
};

function getWidget(fieldObject) {
  var widget = fieldObject.options.widget || null;

  if (!widget) {
    // Let's default to something here
    if (fieldObject.options.type == 'Number')
      widget = 'number';

    else if (fieldObject.options.type == 'String')
      widget = 'text';
  }
  return widget;
}

function getLabel(fieldObject) {
  // If label has been passed, return it.
  var label = fieldObject.options.label || '';
  if (!S(label).isEmpty()) {
    return fieldObject.options.label;
  }
  return S(fieldObject.getName('direct')).humanize().s;
}

/**
 * Build the choices object of labels and values
 */
function buildChoices(fieldObject) {
  var choicesList = fieldObject.methods.getChoicesMethod(fieldObject);
  var choices = {};
  _.each(choicesList, function(element, index) {
    choices[element] = element;
  });

  return choices;
}

/**
 * Get the array that contains the list of choices.
 */
function getChoices(fieldObject) {
  var choices = fieldObject.options.choices || [];
  if (_.isEmpty(choices)) {
    if (_.isFunction(choices))
      choices = choices(fieldObject.options.choices);
  }
  return choices;
}



// export the class
module.exports = Field;
