var mongoose = require('mongoose');
var _ = require('underscore');

var oppQuerySchema = new mongoose.Schema({
  query: mongoose.Schema.Types.Mixed
});

oppQuerySchema.pre('save', function(next) {
  console.log('presave');
  return next();
});

if (process.env.NODE_ENV == 'production') {
  oppQuerySchema.set('autoIndex', false);
}

var oppQueryModel = mongoose.model('OppQuery', oppQuerySchema);

module.exports = oppQueryModel;
