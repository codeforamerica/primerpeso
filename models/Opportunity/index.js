var mongoose = require('mongoose');
var _ = require('underscore');
var S = require('string');
var admin = require('../../custom/fundme-admin');
var Form = require('nodeFormer');
var opSchema = require('./schema')(mongoose);


opSchema.pre('save', function(next) {
  console.log('presave');
  return next();
});

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


opSchema.statics.buildForm = function() {
  var schema = opSchema;
  var form = Form.fromSchema(schema);
  var renderedForm = form.getRenderObject();
  return renderedForm;
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

      //if (!path.options.exclude && op == 'edit')
      if (path.options.initial == true && op == 'edit')
        visibility.push(pathIndex);
    }
  });

  return visibility;
}


var opModel = mongoose.model('Opportunity', opSchema);

/**
 * Register model in admin
 */

// TODO refactor this shit.
var formRenderObject = opModel.buildForm();
admin.add({
  path: 'opportunities',
  model: 'Opportunity',
  list: opModel.getAdminVisibilityList('list'),
  edit: opModel.getAdminVisibilityList('edit'),
  fields: formRenderObject.fields
});


module.exports = opModel;
