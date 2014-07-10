var _ = require('lodash');
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
        required: true,
        label: 'What is Your Gender?',
        choices: choicesList.getFormChoices('gender'),
        widget: 'select',
        name: 'gender'
      },
      age: {
        required: true,
        label: 'How old are you?',
        choices: choicesList.getFormChoices('age'),
        widget: 'checkbox',
        name: 'age'
      }
    },
    purpose: {
      purpose: {
        type: String,
        required: true,
        label: 'What do you need this funding for?',
        choices: choicesList.getFormChoices('purpose'),
        widget: 'checkbox',
        name: 'purpose'
      },
      investingOwnMoney: {
        type: String,
        required: true,
        label: 'Are you investing your own money?',
        choices: {true: 'yes', false: 'no'},
        widget: 'radio',
        name: 'investingOwnMoney'
      },
      moneyInvested: {
        type: String,
        required: true,
        label: 'How much are you investing?',
        prefix: '$',
        name: 'moneyInvested',
        widget: 'text'
      }
    },
    industry: {
      businessType: {
        type: String,
        required: true,
        label: 'What is your business type?',
        choices: choicesList.getFormChoices('eligibleEntityTypes'),
        widget: 'radio',
        name: 'businessType'
      },
      industry: {
        type: String,
        required: true,
        label: 'What type of industry are you operating in?',
        choiceOther: true,
        choices: choicesList.getFormChoices('eligibleIndustries'),
        widget: 'select',
        name: 'industry'
      }
    },
    location: {
      businessLocation: {
        type: String,
        required: true,
        label: 'What is your business location?',
        widget: 'select',
        choices: choicesList.getFormChoices('eligibleBusinessLocation'),
        name: 'businessLocation'
      },
    },
    sizeOfBusiness: {
      employeeNumber: {
        type: String,
        required: true,
        label: 'How many employees do you have?',
        widget: 'radio',
        choices: choicesList.getFormChoices('currentEmployeesRequired'),
        name: 'employeeNumber'
      },
      // @TODO -- this will need a map
      yearsInBusiness: {
        type: String,
        required: true,
        label: 'How many years have you been in business?',
        widget: 'radio',
        choices: choicesList.getFormChoices('yearsInBusiness'),
        name: 'yearsInBusiness'
      },
      annualRevenue: {
        type: String,
        required: true,
        label: 'What is your annual revenue?',
        widget: 'radio',
        choices: choicesList.getFormChoices('annualRevenue'),
        name: 'annualRevenue'
      }
    }
  }
};


exports = module.exports = {
  getFormConfig: function() {
    formConfig.fields = _.mapValues(formConfig.fields, function(fieldSet, fieldSetKey) {
      fieldSet = _.mapValues(fieldSet, function(field, fieldKey) {
        field.name = fieldKey;
        return field;
      });
      return fieldSet;
    });
    return formConfig;
  },

  getFormInfo: function() {

    var formInfo = _.cloneDeep(formConfig);

    formInfo.fields = _.mapValues(formInfo.fields, function(fieldSet, fieldSetKey) {
      fieldSet = _.mapValues(fieldSet, function(field, fieldKey) {
        newField = field
        delete newField['type'];
        delete newField['label'];
        delete newField['choices'];
        return newField;
      });
      return fieldSet;
    });
    return formInfo;
  }
};

