var _ = require('lodash');
var S = require('string');
var OptionsList = require('./OptionsList');
var mixins = require('./formMixins');

function OppQueryForm() {
  var choicesList = new OptionsList('fundMeWizard');
  this.formConfig = {
    options: {
      fieldSets: {
        purpose: {
          'label': 'Purpose'
        },
        aboutYou: {
          'label': 'About You As A Business Owner'
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
      purpose: {
        purpose: {
          type: String,
          required: true,
          label: 'What do you need this funding for?',
          choiceOther: true,
          choices: choicesList.getFormChoices('purpose'),
          widget: 'multiSelect'
          //validate: {
          //  notEmpty: true
          //}
        },
        investingOwnMoney: {
          type: String,
          required: false,
          label: 'Are you investing your own money?',
          tooltip: 'If you plan to or have already invested some personal money, some funding requires a counterpart',
          choices: {1: 'yes', 0: 'no'},
          widget: 'radio'
        },
        moneyInvested: {
          type: String,
          label: 'How much are you investing?',
          tooltip: 'Some funding is specific to certain business structures',
          prefix: '$',
          widget: 'text',
          required: false
        }
      },
      aboutYou: {
        gender: {
          required: true,
          label: 'What is Your Gender?',
          tooltip: 'Gender of the business owner(s)',
          choices: choicesList.getFormChoices('gender'),
          widget: 'select'
        },
        age: {
          required: true,
          label: 'How old are you?',
          tooltip: 'Age of the business owner(s)',
          choices: choicesList.getFormChoices('age'),
          widget: 'checkbox'
        }
      },
      industry: {
        businessType: {
          type: String,
          required: true,
          label: 'What is your business type?',
          tooltip: 'Some funding is specific to certain business structures',
          choices: choicesList.getFormChoices('eligibleEntityTypes'),
          widget: 'radio'
        },
        industry: {
          type: String,
          required: true,
          label: 'What type of industry are you operating in?',
          tooltip: 'The industry you selected when registering your corporation at the Dep of State.',
          choices: choicesList.getFormChoices('eligibleIndustries'),
          widget: 'select',
          choiceOther: true
        }
      },
      location: {
        businessLocation: {
          type: String,
          required: true,
          label: 'What is your business location?',
          tooltip: 'Choose one or more of municipalities where you have a business. If you don’t have one, choose where you intend to set it.',
          widget: 'multiSelect',
          choices: choicesList.getFormChoices('municipalities')
        },
      },
      sizeOfBusiness: {
        employeeNumber: {
          type: String,
          required: true,
          label: 'How many employees do you have?',
          tooltip: 'The number of full-time employees you have or intend to have.  (2 part time employees = 1 full-time)',
          widget: 'radio',
          choices: choicesList.getFormChoices('currentEmployeesRequired')
        },
        // @TODO -- this will need a map
        yearsInBusiness: {
          type: String,
          required: true,
          label: 'How many years have you been in business?',
          tooltip: 'The number of years you\'ve been a registered Corporation or LLC.',
          widget: 'radio',
          choices: choicesList.getFormChoices('yearsInBusiness')
        },
        annualRevenue: {
          type: String,
          required: true,
          label: 'What is your annual revenue?',
          tooltip: 'You can input the last annual revenue.',
          widget: 'radio',
          choices: choicesList.getFormChoices('annualRevenue')
        }
      }
    }
  };
}

_.extend(OppQueryForm.prototype, mixins);

exports = module.exports = OppQueryForm;
