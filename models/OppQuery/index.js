var mongoose = require('mongoose');
var _ = require('underscore');
var admin = require('../../custom/fundme-admin');
var nodeFormer = require('nodeFormer');
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
oppQuerySchema.statics.buildForm = function() {
  // This is mongoose wrapper hack to avoid dealing multiple interfaces in nodeFormer;
  var schema = new mongoose.Schema(formSettings.formConfig.fields);
  var form = nodeFormer.fromSchema(schema, formSettings.formConfig.options);
  return form;
};


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
