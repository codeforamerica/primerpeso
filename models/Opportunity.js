var mongoose = require('mongoose');
var _ = require('underscore');
var admin = require('node-django-admin');

var opSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

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
}


var opModel = mongoose.model('Opportunity', opSchema);

/**
 * Register model in admin
 */

admin.add({
  path: 'opportunities',
  model: 'Opportunity',
  list: [ 'name' ],
  edit: [ 'name' ],
  fields: {
    'name': {
       header: 'Name'
    }
  }
});


module.exports = opModel;
