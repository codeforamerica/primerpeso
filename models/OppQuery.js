var mongoose = require('mongoose');
var _ = require('underscore');
var forms = require('forms');
var fields = forms.fields;
var validators = forms.validators;
var widgets = forms.widgets;
var render = forms.render;
var formHelper = require('../helpers/formHelper');



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
    gender: fields.string({
      choices: { male: 'Male', female: 'Female' },
      widget: widgets.multipleRadio(),
      label: 'What is your Gender?',
    }),
    age: fields.string({
      choices: { '16-25': '16-25', '26-40': '26-40' },
      widget: widgets.multipleRadio(),
      label: 'How old are you?'
    }),
  };
  // End Step 1

  var purpose = {
    needed_for: fields.array({
      widget: widgets.multipleCheckbox(),
      label: 'What do you need this finance for?',
      choices: {
        'start_business': 'Start A Business',
        'start_business': 'Relocate A Business'
      }
    }),
    investing_own: fields.boolean({
      label: 'I am investing my own money in this venture',
    }),
  };

  return formHelper.createMultiForm({
    steps: {
      aboutYou: {
        stepTitle: 'About You As A Business Owner',
        stepFields: aboutYou
      },
      purpose: {
        stepTitle: 'Purpose',
        stepFields: purpose
      }
    }
  }).renderMultiForm();
};

var oppQueryModel = mongoose.model('OppQuery', oppQuerySchema);

module.exports = oppQueryModel;
