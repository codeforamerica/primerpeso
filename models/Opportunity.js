var mongoose = require('mongoose');
var _ = require('underscore');

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

var opModel = mongoose.model('Opportunity', opSchema);

module.exports = opModel;
