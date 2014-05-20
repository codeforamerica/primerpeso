var _ = require('underscore')
var S = require('string');
var Field = require('./field');

// Constructor
function Form(schema, extraParams) {
  // always initialize all instance properties
  this.paths = schema.paths;
  this.virtuals = schema.virtuals;
  this.options = _.extend({
    eachFieldOptions: {}
  }, extraParams);
  this.fields = {};
  _.each(this.paths, function(path, pathName) {
    var field = new Field(path, this.options.eachFieldOptions);
    this.fields[pathName] = field;
  }, this);
}

// class methods
Form.prototype.getFields = function() {
  var fields = {};
  _.each(this.fields, function(element, index) {
    fields[index] = element.options;
  });

  return fields;
};
// export the class
module.exports = Form;
