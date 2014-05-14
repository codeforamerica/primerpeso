var mongoose = require('mongoose');
var _ = require('underscore');
var admin = require('../custom/fundme-admin');

var opSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  purpose: { type: String, required: true },
  reappliable: { type: Boolean, default: false },
  // REVIEW
  eligibleBizLoc: { type: String, required: true },
  // REVIEW
  disqualifyingFactors: {type: String, required: true, default: 'none'},
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
}


var opModel = mongoose.model('Opportunity', opSchema);

/**
 * Register model in admin
 */

admin.add({
  path: 'opportunities',
  model: 'Opportunity',
  list: [ 'name' ],
  edit: [ 'name' ],
  fields: {
    'name': {
       header: 'Name'
    }
  }
});


module.exports = opModel;
