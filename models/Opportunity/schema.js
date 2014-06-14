var choicesList = require('../choices');

exports = module.exports = function(mongoose) {
  var opSchema = new mongoose.Schema({
    title:  { type: String, required: true, unique: true, label: 'Program Title', includeList: true },
    purpose: { type: String, required: true, widget: 'textArea'},
    // @TODO -- handle bOOL
    canBeReappliedFor: {
      type: String,
      default: false,
      widget: 'select',
      choices: ['No', 'Yes']
    },
    eligibleBusinessLocation: [{
      type: String,
      required: true,
      choiceOther: false,
      widget: 'checkbox',
      choices: choicesList.eligibleBusinessLocation
    }],
    disqualifyingFactors: {
      type: String,
      required: true,
      default: 'none',
      widget: 'textArea'
    },
    paperworkRequired: [{ type: String, widget: 'textArea' }],
    applicationCost: { type: Number, required: true},
    applicationDeadline: { type: Date, required: true, widget: 'date' },
    avgApplicationTime: { type: String, required: true },
    // TODO -- abstract choices to freaking callbacks.
    benefitType: [{
      type: String,
      required: true,
      widget: 'select',
      choices: choicesList.benefitType
   }],
    benefitDescription: [{ type: String, required: true, widget: 'textArea' }],
    agency: {
      name: {
        type: String,
        required: true,
        label: 'Agency Name'
      },
      agencyContact: {
        name: { type: String, required: true, label: 'Agency Contact Name' },
        email: { type: String, required: true, label: 'Agency Contact Email', widget: 'email' },
        phone: { type: String, required: true, label: 'Agency Contact Phone', widget: 'phone' }
      }
    },
    bizEligibility: {
      minimumYearsInBusiness: {
        type: String,
        required: true,
      },
      eligibleEntityTypes: [{
        type: String,
        widget: 'checkbox',
        required: true,
        choices: choicesList.eligibleEntityTypes
      }],
      currentEmployeesRequired: {
        type: String,
        widget: 'multiSelect',
        required: true,
        choices: choicesList.currentEmployeesRequired
      },
      annualRevenue: {
        type: String,
        widget: 'multiSelect',
        choices: choicesList.annualRevenue

      },
      eligibleIndustries: [{
        type: String,
        required: true,
        widget: 'multiSelect',
        choices: choicesList.eligibleIndustries
      }],
    },
    audienceEligibility: {
      gender: {
        type: String,
        required: true,
        widget: 'radio',
        choices: ['Male', 'Female']
      },
      age: {
        type: Number,
        required: true,
      },
      additionalDemographics:[{
        type: String,
        required: true,
        widget: 'checkbox',
        choices: ['student', 'veteran', 'minority']
      }]
    }
  });
  if (process.env.NODE_ENV == 'production') {
    opSchema.set('autoIndex', false);
  }
  return opSchema;
}
