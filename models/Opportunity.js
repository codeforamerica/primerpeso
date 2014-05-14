var mongoose = require('mongoose');
var _ = require('underscore');
var S = require('string');
var admin = require('../custom/fundme-admin');
var formMaker = require('../custom/formMaker');

var opSchema = new mongoose.Schema({
	title:  { type: String, required: true, unique: true, label: 'Program Title' },
	purpose: { type: String, required: true, label: 'Purpose', widget: 'textArea' },
	reAppliable: {
		type: String,
		default: 'No',
		choices: [ 'No', 'Yes' ],
		label: 'Can Be Reapplied For',
		widget: 'select'
	},
	/*eligibleBizLoc: [{
		type: String,
		required: true,
		choiceOther: false,
		label: 'Eligible Business Location',
		widget: 'radio',
		choices: [
		  'Anywhere In Puerto Rico',
		  'Municipality in Puerto Rico',
		  'Region in Puerto Rico',
		  'Outside of Puerto Rico'
		]
	}],*/
	disqualifyingFactors: {
		type: String, required: true, default: 'none', label: 'Disqualifying Factors', widget: 'textArea'
	},
	//paperwork: [{ type: String, label: 'Paperwork Required', widget: 'textArea' }],
	applicationCost: { type: Number, required: true, label: 'Application Cost' },
	//deadline: { type: Date, required: true, label: 'Application Deadline', widget: 'date' },
	avgApplyTime: { type: String, required: true, label: 'Average Application Time' },
	//benefitType: [{ type: String, required: true, label: 'Type of Benefit', widget: 'select' }],
	//benefitDescription: [{ type: String, required: true, label: 'Benefit Description', widget: 'textArea' }],
	/*agency: {
		name: { type: String, required: true, label: 'Agency Name' },
		agencyContact: {
			name: { type: String, required: true, label: 'Agency Contact Name' },
			email: { type: String, required: true, label: 'Agency Contact Email', widget: 'email' },
			phone: { type: String, required: true, label: 'Agency Contact Phone', widget: 'phone' }
		}
	},
	bizEligibility: {
		minYearsInBiz: { type: String, required: true, label: 'Minimum Years in Business' },
		eligibleEntityTypes: [{ type: String, widget: 'checkbox', required: true, label: 'Eligible Entity Types' }],
		currentEmp: { type: String, widget: 'multiselect', required: true, label: 'Current Employees Required to be Eligible' },
		annualRev: { type: String, label: 'Annual Revenue your company must have', widget: 'multiselect' },
		eligibleIndustries: [{
			type: String,
			required: true,
			label: 'Eligible Industries',
			widget: 'multiselect'
		}],
	},
	audienceEligibility: {
		gender: { type: String, required: true, label: 'Gender', widget: 'radio' },
		age: { type: Number, required: true, label: 'Age' },
		additionalDemographics:[{
			type: String,
			required: true,
			label: 'Additional Demographics',
			widget: 'checkbox'
		}]
	}*/
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



opSchema.statics.buildFormFields = function() {
  var schema = opSchema;
  var form = formMaker.create(schema);
  return form.fields;
}

opSchema.statics.getAdminVisibilityList = function(op) {
	var visibility = ['title'];
  /*if (op == 'list') {
    visibility.push
  }*/
  if (op == 'edit') {
    visibility.push(
      "purpose",
      "reAppliable",
      "disqualifyingFactors",
      "applicationCost",
      "avgApplyTime"
    );
  }

  return visibility;
}


var opModel = mongoose.model('Opportunity', opSchema);

/**
 * Register model in admin
 */

admin.add({
  path: 'opportunities',
  model: 'Opportunity',
  list: opModel.getAdminVisibilityList('list'),
  edit: opModel.getAdminVisibilityList('edit'),
  fields: opModel.buildFormFields()
});


module.exports = opModel;
