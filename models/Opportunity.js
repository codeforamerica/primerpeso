var mongoose = require('mongoose');
var _ = require('underscore');
var S = require('string');
var admin = require('../custom/fundme-admin');

var opSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  purpose: { type: String, required: true },
  reappliable: { type: Boolean, default: false, choices: ['No', 'Yes'] },
  // REVIEW
  // @TODO -- store multi property or check for array in paths?
  eligibleBizLoc: [{
    type: String,
    required: true,
    choiceOther: false,
    choices: [
      'Anywhere In Puerto Rico',
      'Municipality in Puerto Rico',
      'Region in Puerto Rico',
      'Outside of Puerto Rico',
    ]
  }],
  // REVIEW
  disqualifyingFactors: { type: String, required: true, default: 'none' },
  paperwork: [{ type: String }],
  applicationCost: { type: Number, required: true },
  deadline: { type: Date, required: true },
  avgApplyTime: { type: Date, required: true },
  benefitType: [{ type: String, required: true }],
  benefitDescription: [{ type: String, required: true }],
  agency: {
    name: { type: String, required: true },
    agencyContact: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    }
  },

  bizEligibility: {
    minYearsInBiz: { type: String, required: true },
    eligibleEntityTypes: [{ type: String, required: true }],
    currentEmp: { type: String, required: true },
    annualRev: { type: String },
    eligibleIndustries: [{ type: String, required: true}],
  },

  audienceEligibility: {
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    additionalDemographics: [{ type: String, required: true}]
  }
});

opSchema.pre('save', function(next) {
  console.log('presave');
  return next();
});

if (process.env.NODE_ENV == 'production') {
  opSchema.set('autoIndex', false);
}

opSchema.statics.load = function(id, cb) {
  this.findOne({ _id : id }).exec(cb);
};

opSchema.statics.list = function(options, cb) {
  var criteria = options.criteria || {};
  var order = options.order || {'name': 1};

  this.find(criteria)
    .sort(order)
    .limit(options.perPage)
    .skip(options.perPage * options.page)
    .exec(cb);
};

opSchema.statics.getEditFormFields = function() {
  // The field object acts ONLY as overrides.
  var fields = {
    // TODO -- see about passing attributes through
    // fall back to short text for no type
    title: { label: 'Program Title'},
    purpose: { label: 'Purpose', type: 'longText' },
    reAppliable: { label: 'Can Be Reapplied For', type: 'dropdown' },
    // REVIEW
    eligibleBizLoc: { label: 'Eligible Business Location', type: 'radio'},
    // REVIEW
    disqualifyingFactors: { label: 'Disqualifying Factors', type: 'longText'},
    paperwork: { label: 'Paperwork Required', type: 'longText' },
    applicationCost: { label: 'Paperwork Required'},
    deadline: { label: 'Application Deadline', type: 'date' },
    avgApplyTime: { label: 'Average Application Time'},
    benefitType: { label: 'Type of Benefit', type: 'dropdown'},
    benefitDescription: { label: 'Benefit Description', type: 'longText' },
    agency: {
      name: { label: 'Agency Name' },
      agencyContact: {
        name: { label: 'Agency Contact Name' },
        email: { label: 'Agency Contact Email', type: 'email'},
        phone: { label: 'Agency Contact Phone', type: 'phone' }
      }
    },

    bizEligibility: {
      minYearsInBiz: { label: 'Minimum Years in Business' },
      eligibleEntityTypes: { label: 'Eligible Entity Types', type:'checkbox' },
      currentEmp: { label: 'Current Employees Required to be Eligible', type:'multiDropDown'  },
      annualRev: { label: 'Annual Revenue your company must have', type: 'multiDropDown' },
      eligibleIndustries: { label: 'Eligible Industries', type: 'multiDropDown' },
    },

    audienceEligibility: {
      gender: { label: 'Gender', type: 'radio' },
      age: { label: 'Age' },
      additionalDemographics: { label: 'Additional Demographics', type: 'checkbox' }
    }
  };

  // @TODO -- run a POSTPROCESS to add mongoose things like required;
  // name
  //

}


var opModel = mongoose.model('Opportunity', opSchema);

/**
 * Register model in admin
 */

/*admin.add({
  path: 'opportunities',
  model: 'Opportunity',
  list: [ 'name' ],
  edit: [ 'name' ],
  fields: opModel.getEditFormFields()
});*/


module.exports = opModel;
