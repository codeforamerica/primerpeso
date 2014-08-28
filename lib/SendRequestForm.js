var _ = require('lodash');
var S = require('string');
var OptionsList = require('./OptionsList');
var mixins = require('./formMixins');

function SendRequestForm() {
  var choicesList = new OptionsList('fundMeWizard');
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
          label: 'Nombre',
          widget: 'text'
        },
        phone: {
          type: String,
          label: 'Número de teléfono',
          widget: 'text'
        },
        email: {
          label: 'Correo electrónico',
          widget: 'email'
        },
        address: {
          label: 'Dirección postal',
          widget: 'text'
        },
        municipality: {
	  label: 'Municipio / Ciudad',
	  widget: 'text',
        },
        state: {
          label: 'Estado',
          widget: 'select',
          choices: choicesList.getFormChoices('statesList'),
          value: 'PR'
        },
        zip: {
          label: 'Código Postal',
          widget: 'text'
        },
        areYouInc: {
          required: true,
          label: '¿Estas incorporado?',
          widget: 'radio',
          choices: { 0: "No", 1: "Si" }
        }
      },
      aboutYourBusiness: {
        legalCompanyName: {
          type: String,
          label: 'Nombre legal de la Compañía',
          widget: 'text'
        },
        bizAddress: {
          label: 'Dirección postal',
          widget: 'text'
        },
        bizMunicipality: {
          label: 'Municipio',
	  widget: 'text',
        },
        bizState: {
          label: 'Estado',
          widget: 'select',
          choices: choicesList.getFormChoices('statesList'),
          value: 'PR'
        },
        bizZip: {
          label: 'Código Postal',
          widget: 'text'
        },
      },
    }
  };
}

_.extend(SendRequestForm.prototype, mixins);

exports = module.exports = SendRequestForm;
