var mongoose = require('mongoose');
var _ = require('underscore');
var admin = require('../../custom/fundme-admin');
var Form = require('nodeFormer');
var oppQuerySchema = require('./schema')(mongoose);
var formSettings = require('./formSettings');


oppQuerySchema.pre('save', function(next) {
  console.log('presave');
  return next();
});

oppQuerySchema.statics.load = function(id, cb) {
  this.findOne({ _id : id }).exec(cb);
};

oppQuerySchema.statics.list = function(options, cb) {
  var criteria = options.criteria || {};
  var order = options.order || {'name': 1};

  this.find(criteria)
    .sort(order)
    .limit(options.perPage)
    .skip(options.perPage * options.page)
    .exec(cb);
}

/**
 * Method for generating the query form.
 */
oppQuerySchema.statics.buildFormFields = function() {
  var formConfig = formSettings.formConfig;
  var form = new Form(formConfig, {
    choicesList: formSettings.choices,
  });
  form.buildFields();
  var fields = form.getFieldsForRender();
  return fields;
}


/**
 * Register model in Mongoose
 */

var oppQueryModel = mongoose.model('OppQuery', oppQuerySchema);

/**
 * Register model in admin
 */
admin.add({
  path: 'oppQueries',
  model: 'OppQuery',
  list: [ 'query' ],
  edit: [ 'query' ],
  fields: {
    'query': {
       header: 'Query'
    }
  }
});

module.exports = oppQueryModel;
