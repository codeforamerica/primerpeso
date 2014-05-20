var mongoose = require('mongoose');
var _ = require('underscore');
var S = require('string');
var admin = require('../../custom/fundme-admin');
var Form = require('../../custom/formMaker/form');
var opSchema = require('./schema')(mongoose);
var choicesGetter = require('./choices');


opSchema.pre('save', function(next) {
  console.log('presave');
  return next();
});

if (process.env.NODE_ENV == 'production') {
  opSchema.set('autoIndex', false);
}

opSchema.statics.load = function(id, cb) {
  this.findOne({ _id : id }).exec(cb);
};

opSchema.statics.list = function(options, cb) {
  var criteria = options.criteria || {};
  var order = options.order || {'name': 1};

  this.find(criteria)
    .sort(order)
    .limit(options.perPage)
    .skip(options.perPage * options.page)
    .exec(cb);
};


opSchema.statics.buildFormFields = function() {
  var schema = opSchema;
  var form = new Form(schema, {
    eachFieldOptions: { methods: { getChoicesMethod: choicesGetter} }
  });
  var fields = form.getFields();
  console.log(fields);
  return form.getFields();
}

opSchema.statics.getAdminVisibilityList = function(op) {
  // Exclude from edit = exclude=true
  // Include in list = includeList=true
  var opKey = op == 'list' ? 'includeList' : 'exclude';
	var visibility = [];
  var paths = opSchema.paths;
  var excludeAllways = ['__v', '_id'];
  _.each(paths, function(path, pathIndex) {
    if (!_.contains(excludeAllways, pathIndex)) {

      if (path.options.includeList && op == 'list')
        visibility.push(pathIndex);

      if (!path.options.exclude && op == 'edit')
        visibility.push(pathIndex);
    }
  });

  //console.log('OP: ' + op);
 // console.log(visibility);
  return visibility;
}


var opModel = mongoose.model('Opportunity', opSchema);

/**
 * Register model in admin
 */

// TODO refactor this shit.
admin.add({
  path: 'opportunities',
  model: 'Opportunity',
  list: opModel.getAdminVisibilityList('list'),
  edit: opModel.getAdminVisibilityList('edit'),
  fields: opModel.buildFormFields()
});


module.exports = opModel;
