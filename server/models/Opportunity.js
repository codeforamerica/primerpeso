var mongoose = require('mongoose');
var _ = require('underscore');
// FORM GEN -> https://github.com/powmedia/backbone-forms

var opSchema = new mongoose.Schema({
  name: {type: String, required: true },
  description: {type: String, required: true},
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
