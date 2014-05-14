var mongoose = require('mongoose');
var _ = require('underscore');
var S = require('string');
var admin = require('../custom/fundme-admin');
var formMaker = require('../custom/formMaker');

var opSchema = new mongoose.Schema({
	title:  { type: String, required: true, unique: true, label: 'Program Title' },
	purpose: { type: String, required: true, label: 'Purpose', fieldType: 'longText' },
	reAppliable: {
		type: Boolean,
		default: false,
		choices: [ 'No', 'Yes' ],
		label: 'Can Be Reapplied For',
		fieldType: 'dropdown'
	},
	eligibleBizLoc: [{
		type: String,
		required: true,
		choiceOther: false,
		label: 'Eligible Business Location',
		fieldType: 'radio',
		choices: [
		  'Anywhere In Puerto Rico',
		  'Municipality in Puerto Rico',
		  'Region in Puerto Rico',
		  'Outside of Puerto Rico'
		]
	}],
	disqualifyingFactors: {
		type: String, required: true, default: 'none', label: 'Disqualifying Factors', fieldType: 'longText'
	},
	paperwork: [{ type: String, label: 'Paperwork Required', fieldType: 'longText' }],
	applicationCost: { type: Number, required: true, label: 'Paperwork Required' },
	deadline: { type: Date, required: true, label: 'Application Deadline', fieldType: 'date' },
	avgApplyTime: { type: Date, required: true, label: 'Average Application Time' },
	benefitType: [{ type: String, required: true, label: 'Type of Benefit', fieldType: 'dropdown' }],
	benefitDescription: [{ type: String, required: true, label: 'Benefit Description', fieldType: 'longText' }],
	agency: {
		name: { type: String, required: true, label: 'Agency Name' },
		agencyContact: {
			name: { type: String, required: true, label: 'Agency Contact Name' },
			email: { type: String, required: true, label: 'Agency Contact Email', fieldType: 'email' },
			phone: { type: String, required: true, label: 'Agency Contact Phone', fieldType: 'phone' }
		}
	},
	bizEligibility: {
		minYearsInBiz: { type: String, required: true, label: 'Minimum Years in Business' },
		eligibleEntityTypes: [{ type: String, fieldType: 'checkbox', required: true, label: 'Eligible Entity Types' }],
		currentEmp: { type: String, fieldType: 'multiDropDown', required: true, label: 'Current Employees Required to be Eligible' },
		annualRev: { type: String, label: 'Annual Revenue your company must have', fieldType: 'multiDropDown' },
		eligibleIndustries: [{
			type: String,
			required: true,
			label: 'Eligible Industries',
			fieldType: 'multiDropDown'
		}],
	},
	audienceEligibility: {
		gender: { type: String, required: true, label: 'Gender', fieldType: 'radio' },
		age: { type: Number, required: true, label: 'Age' },
		additionalDemographics:[{
			type: String,
			required: true,
			label: 'Additional Demographics',
			fieldType: 'checkbox'
		}]
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

opSchema.statics.getForm = function(object) {
  formMaker.makeForm(opSchema, object);
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
