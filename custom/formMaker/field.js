var _ = require('underscore')
var S = require('string');

var build = {
  label: function(fieldObject, fieldInfo, fieldOptions) {
    // Can depend on name being there.
    return S(fieldObject.getName('direct')).humanize().s;
  },

  widget: function(fieldObject, fieldInfo, fieldOptions) {
    var widget = fieldObject.widget || '';
    if (fieldObject.type == 'Number')
      widget = 'number';

    else if (fieldObject.type == 'String')
      widget = 'text';

    return widget;
  },

  choices: function(fieldObject, fieldInfo, fieldOptions) {
    var choicesList = fieldOptions.choices[fieldObject.getName('direct')] || [];
    var choices = {};
    _.each(choicesList, function(element, index) {
      choices[element] = element;
    });

    return choices;
  },
};

// Constructor
function Field(fieldInfo, fieldOptions) {
  this.name = fieldInfo.name || '';
  this.label = fieldInfo.label || '';
  this.widget = fieldInfo.widget || '';
  this.required = fieldInfo.required || false;
  this.choices = fieldInfo.choices || [];
  // Construct each method using private builders.
  _.each(this, function(element, index) {
    // All passed in options always override.
    if (_.isEmpty(element) && index != 'required') {
      if (index == 'name') {
        throw new Error ('Cannot be missing' + index);
      }
      if (!_.isFunction(build[index])) {
        throw new Error ('Dont know how to build ' + index);
      }

      // We already got the stuff incoming from field info, let's fall back to either
      // things coming in from fieldOptions, or internal methods.
      this[index] = build[index](this, fieldInfo, fieldOptions);
    }
  }, this);
}

// class methods
Field.prototype.getName = function(use) {
  if (use && S(this.name).contains('.')) {
    var brokenPath = this.name.split('.');
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
  return this.name;
};

Field.prototype.getRenderConfig = function() {
  var exportedField = _.clone(this);
  exportedField.header = exportedField.label;
  exportedField.name = this.getName('form');
  return exportedField;
}

// export the class
module.exports = Field;
