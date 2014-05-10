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

oppQuerySchema.statics.getQueryForm = function() {
  // @TODO -- feed some of this from the op model?
  // Step 1
  var aboutYou = {
    title: 'About You As A Business Owner',
    gender: {
      choices: { male: 'Male', female: 'Female' },
      label: 'What is your Gender?',
      name: 'gender'
    },
    age: {
      choices: { '16-25': '16-25', '26-40': '26-40' },
      label: 'How old are you?',
      name: 'age',
    },
  };
  // End Step 1

  var purpose = {
    title: 'Purpose',
    needed_for: {
      label: 'What do you need this finance for?',
      name: 'needed_for',
      choices: {
        'start_business': 'Start A Business',
        'start_business': 'Relocate A Business'
      }
    },
    investing_own: {
      label: 'I am investing my own money in this venture',
      name: 'investing_own',
      choices: {
        '0': 'No',
        '1': 'Yes'
      }
    },
  };
  return { 'aboutYou': aboutYou, 'purpose': purpose };
};

var oppQueryModel = mongoose.model('OppQuery', oppQuerySchema);

module.exports = oppQueryModel;
