var _ = require('lodash');
var S = require('string');
var OptionsList = require('./OptionsList');
var mixins = require('./formMixins');

function OppQueryForm() {
  console.log('oppquery form init choices list for fundme wizard.');
  var choicesList = new OptionsList('fundMeWizard');
  this.formConfig = {
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
          widget: 'select'
        },
        age: {
          required: true,
          label: 'How old are you?',
          choices: choicesList.getFormChoices('age'),
          widget: 'checkbox'
        }
      },
      purpose: {
        purpose: {
          type: String,
          required: true,
          label: 'What do you need this funding for?',
          choiceOther: true,
          choices: choicesList.getFormChoices('purpose'),
          widget: 'multiSelect'
        },
        investingOwnMoney: {
          type: String,
          required: false,
          label: 'Are you investing your own money?',
          choices: {1: 'yes', 0: 'no'},
          widget: 'radio'
        },
        moneyInvested: {
          type: String,
          label: 'How much are you investing?',
          prefix: '$',
          widget: 'text',
          required: false
        }
      },
      industry: {
        businessType: {
          type: String,
          required: true,
          label: 'What is your business type?',
          choices: choicesList.getFormChoices('eligibleEntityTypes'),
          widget: 'radio'
        },
        industry: {
          type: String,
          required: true,
          label: 'What type of industry are you operating in?',
          choices: choicesList.getFormChoices('eligibleIndustries'),
          widget: 'select'
        }
      },
      location: {
        businessLocation: {
          type: String,
          required: true,
          label: 'What is your business location?',
          widget: 'select',
          choices: choicesList.getFormChoices('eligibleBusinessLocation')
        },
      },
      sizeOfBusiness: {
        employeeNumber: {
          type: String,
          required: true,
          label: 'How many employees do you have?',
          widget: 'radio',
          choices: choicesList.getFormChoices('currentEmployeesRequired')
        },
        // @TODO -- this will need a map
        yearsInBusiness: {
          type: String,
          required: true,
          label: 'How many years have you been in business?',
          widget: 'radio',
          choices: choicesList.getFormChoices('yearsInBusiness')
        },
        annualRevenue: {
          type: String,
          required: true,
          label: 'What is your annual revenue?',
          widget: 'radio',
          choices: choicesList.getFormChoices('annualRevenue')
        }
      }
    }
  };
}

_.extend(OppQueryForm.prototype, mixins);

exports = module.exports = OppQueryForm;
