var _ = require('lodash');
var S = require('string');
var OptionsList = require('./OptionsList');
var mixins = require('./formMixins');
var db = require('../models');
var sequelize = db.sequelize;
var Submission = sequelize.model('submission');

function OppQueryForm() {
  var attributes = Submission._getAttributes();
  var choicesList = new OptionsList('fundMeWizard');
  // TODO -- move this into model.
  this.formConfig = {
    options: {
      fieldSets: {
        purpose: {
          'label': 'Propósito'
        },
        aboutYou: {
          'label': 'Sobre el propietario'
        },
        industry: {
          'label': 'Industria'
        },
        location: {
          'label': 'Ubicación'
        },
        sizeOfBusiness: {
          'label': 'Tamaño del negocio'
        }
      }
    },
    fields: {
      purpose: {
	purpose: attributes.purpose,
	investingOwnMoney: attributes.investingOwnMoney,
	moneyInvested: attributes.moneyInvested,
      },
      aboutYou: {
	gender: attributes.gender,
	age: attributes.age,
      },
      industry: {
	businessType: attributes.businessType,
	industry: attributes.industry,
      },
      location: {
	businessLocation: attributes.businessLocation
      },
      sizeOfBusiness: {
	employeeNumber: attributes.employeeNumber,
        // @TODO -- this will need a map
	yearsInBusiness: attributes.yearsInBusiness,
	annualRevenue: attributes.annualRevenue
      }
    }
  };
}

_.extend(OppQueryForm.prototype, mixins);

exports = module.exports = OppQueryForm;
