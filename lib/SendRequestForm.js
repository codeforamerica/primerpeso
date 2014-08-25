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
          'label': 'Sobre ti'
        },
        aboutYourBusiness: {
          'label': 'Sobre tu Negocio'
        },
      }
    },
    fields: {
      aboutYou: {
        name: {
          required: true,
          label: 'Tu nombre',
          widget: 'text'
        },
        phone: {
          required: true,
          type: String,
          label: 'Phone Number',
          widget: 'text'
        },
        email: {
          required: true,
          type: String,
          label: 'Email Address',
          widget: 'email'
        },
        address: {
          required: true,
          label: 'Dirección postal',
          widget: 'text'
        },
        city: {
          required: true,
          label: 'Ciudad',
          widget: 'text'
        },
        state: {
          required: true,
          label: 'Municipio o Estado',
          widget: 'text'
        },
        zip: {
          required: true,
          label: 'Código Postal',
          widget: 'text'
        },
        areYouInc: {
          required: true,
          label: 'Are you incorporated?',
          widget: 'radio',
          choices: { 0: "No", 1: "Yes" }
        }
      },
      aboutYourBusiness: {
        legalCompanyName: {
          type: String,
          label: 'Nombre legal de la Compania',
          widget: 'text'
        },
        bizAddress: {
          required: true,
          label: 'Dirección postal',
          widget: 'text'
        },
        bizCity: {
          required: true,
          label: 'Ciudad',
          widget: 'text'
        },
        bizState: {
          required: true,
          label: 'Municipio o Estado',
          widget: 'text'
        },
        bizZip: {
          required: true,
          label: 'Código Postal',
          widget: 'text'
        },
      },
    }
  };
}

_.extend(SendRequestForm.prototype, mixins);

exports = module.exports = SendRequestForm;
