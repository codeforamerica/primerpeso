var _ = require('underscore')
var S = require('string');
var Field = require('./field');

// Constructor
function Form(formConfig, extraParams) {
  // always initialize all instance properties
  this.form = formConfig.form || {};
  this.fields = formConfig.fields;
  this.options = _.extend({
    choices: []
  }, extraParams);
}

// class methods
Form.prototype.buildFields = function() {
  _.each(this.fields, function(config, confName) {
    var field = new Field(config, this.options);
    this.fields[confName] = field;
  }, this);
}

Form.prototype.getFieldsForRender = function() {
  var fieldsForRender = {};
  _.each(this.fields, function(field, fieldKey) {
    fieldsForRender[fieldKey] = field.getRenderConfig();
  }, this);
  return _.omit(fieldsForRender, ['__v', '_id']);
};

// Overload constructor.
Form.fromSchema = function(schema, extraParams) {
  var paths = schema.paths;
  var virtuals = schema.virtuals;
  // Process incoming schema into FormConfig
  // @TODO -- virtuals later.
  var formConfig = {
    form: {},
    fields: {}
  };
  _.each(paths, function(path, pathName) {
    path = _.isEmpty(path.caster) ? path : path.caster;
    // Restructure mongoose path object
    formConfig.fields[pathName] = _.extend({
      type: path.instance,
      name: path.path,
      validators: path.validators
    }, path.options);
  });
  var instance = new this(formConfig, extraParams);
  return instance;
}

// export the class
module.exports = Form;
