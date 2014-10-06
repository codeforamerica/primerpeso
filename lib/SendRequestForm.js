var _ = require('lodash');
var S = require('string');
var OptionsList = require('./OptionsList');
var mixins = require('./formMixins');

function SendRequestForm() {
  var attributes = Submission._getAttributes();
  // TODO -- move this into model.
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
        name: attributes.name,
        phone: attributes.phone,
        email: attributes.email,
        address: attributes.address,
        municipality: attributes.municipality,
        state: attributes.state,
        zip: attributes.zip,
        areYouInc: attributes.areYouInc
      },
      aboutYourBusiness: {
        legalCompanyName: attributes.legalCompanyName,
        bizAddress: attributes.bizAddress,
        bizMunicipality: attributes.bizMunicipality,
        bizState: attributes.bizState,
        bizZip: attributes.bizZip
      },
    }
  };
}

_.extend(SendRequestForm.prototype, mixins);

exports = module.exports = SendRequestForm;
