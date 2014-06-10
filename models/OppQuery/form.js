var _ = require('underscore');
var S = require('string');
var choicesList = require('./choices');

var formConfig = {
  options: {
    fieldSets: {
      aboutYou: {
        'label': 'About You As A Business Owner'
      },
      purpose: {
        'label': 'Purpose'
      }
    }
  },
  fields: {
    aboutYou: {
      gender: {
        type: String,
        required: true,
        label: 'What is Your Gender?',
        choices: ['Male', 'Female'],
        widget: 'select'
      },
      age: {
        type: String,
        required: true,
        label: 'How old are you?',
        choices: choicesList.age,
        widget: 'checkbox'
      }
    },
    purpose: {
      purpose: {
        type: String,
        required: true,
        label: 'What do you need this funding for?',
        choices: choicesList.purpose,
        widget: 'checkbox'
      },
      investingOwn: {
        type: String,
        required: true,
        label: 'Are you investing your own money?',
        choices: ['No', 'Yes'],
        widget: 'radio'
      },
      investingOwnAmount: {
        type: String,
        required: true,
        label: 'How much are you investing?',
        prefix: '$'
      }
    }
  }
};


exports = module.exports = {
  formConfig: formConfig
};

