var _ = require('underscore');
var S = require('string');
var choicesList = require('./options');

var formConfig = {
  options: {
    fieldSets: {
      aboutYou: {
        'label': 'About You As A Business Owner'
      },
      purpose: {
        'label': 'Purpose'
      },
      industry: {
        'label': 'Industry'
      },
      location: {
        'label': 'Location'
      },
      sizeOfBusiness: {
        'label': 'Size Of Business'
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
    },
    industry: {
      businessType: {
        type: String,
        required: true,
        label: 'What is your business type?',
        choices: choicesList.businessType,
        widget: 'radio'
      },
      industry: {
        type: String,
        required: true,
        label: 'What type of industry are you operating in?',
        choiceOther: true,
        choices: choicesList.eligibleIndustries,
        widget: 'select'
      }
    },
    location: {
      businessLocation: {
        type: String,
        required: true,
        label: 'What is your business location?',
      },
    },
    sizeOfBusiness: {
      employeeNumber: {
        type: String,
        required: true,
        label: 'How many employees do you have?',
        widget: 'radio',
        choices: choicesList.currentEmployeesRequired
      },
      yearsInBusiness: {
        type: String,
        required: true,
        label: 'How many years have you been in business?',
        widget: 'radio',
        choices: choicesList.yearsInBusiness
      },
      annualRevenue: {
        type: String,
        required: true,
        label: 'What is your annual revenue?',
        widget: 'radio',
        choices: choicesList.annualRevenue
      }
    }
  }
};


exports = module.exports = {
  formConfig: formConfig
};

