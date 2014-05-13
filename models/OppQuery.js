var mongoose = require('mongoose');
var _ = require('underscore');
var admin = require('../custom/fundme-admin');

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

oppQuerySchema.statics.getQueryForm = function() {
  // @TODO -- feed some of this from the op model?
  // Step 1
  var aboutYou = {
    title: 'About You As A Business Owner',
    gender: {
      choices: { male: 'Male', female: 'Female' },
      label: 'What is your Gender?',
      name: 'gender',
      type: 'radio'
    },
    age: {
      choices: { '16-25': '16-25', '26-40': '26-40' },
      label: 'How old are you?',
      name: 'age',
      type: 'radio'
    },
  };
  // End Step 1

  var purpose = {
    title: 'Purpose',
    needed_for: {
      label: 'What do you need this finance for?',
      name: 'needed_for',
      type: 'checkbox',
      choices: {
        'start_business': 'Start A Business',
        'start_business': 'Relocate A Business'
      }
    },
    investing_own: {
      label: 'I am investing my own money in this venture',
      name: 'investing_own',
      type: 'checkbox',
      choices: {
        '0': 'No',
        '1': 'Yes'
      }
    },
  };
  return { 'aboutYou': aboutYou, 'purpose': purpose };
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
