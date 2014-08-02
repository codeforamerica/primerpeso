var _ = require('lodash');
var S = require('string');
var OptionsList = require('./OptionsList');
var mixins = require('./formMixins');

function SendRequestForm() {
  var choicesList = new OptionsList();
  this.formConfig = {
    options: {
      fieldSets: {
        aboutYou: {
          'label': 'About You'
        },
        aboutYourBusiness: {
          'label': 'About Your Business'
        },
      }
    },
    fields: {
      aboutYou: {
        name: {
          required: true,
          label: 'Your Name',
          widget: 'text'
        },
        address: {
          required: true,
          label: 'Address',
          widget: 'text'
        },
        city: {
          required: true,
          label: 'City',
          widget: 'text'
        },
        state: {
          required: true,
          label: 'State',
          widget: 'text'
        },
        zip: {
          required: true,
          label: 'Zip Code',
          widget: 'text'
        },
      },
      aboutYourBusiness: {
        legalCompanyName: {
          type: String,
          label: 'Legal Name Of Your Company',
          widget: 'text'
        },
        bizPhone: {
          required: true,
          type: String,
          label: 'Phone Number',
          widget: 'text'
        },
        bizEmail: {
          required: true,
          type: String,
          label: 'Email Address',
          widget: 'email'
        },
        bizAddress: {
          required: true,
          label: 'Address',
          widget: 'text'
        },
        bizCity: {
          required: true,
          label: 'City',
          widget: 'text'
        },
        bizState: {
          required: true,
          label: 'State',
          widget: 'text'
        },
        bizZip: {
          required: true,
          label: 'Zip Code',
          widget: 'text'
        },

      },
    }
  };
}

_.extend(SendRequestForm.prototype, mixins);

exports = module.exports = SendRequestForm;
