var mongoose = require('mongoose');
var _ = require('underscore');
var S = require('string');
var admin = require('../custom/fundme-admin');
var formMaker = require('../custom/formMaker');

// TODO -- look at possibly using enum string validators to generate choices.
var opSchema = new mongoose.Schema({
	title:  { type: String, required: true, unique: true, label: 'Program Title', includeList: true },
	purpose: { type: String, required: true, widget: 'textArea' },
	canBeReappliedFor: {
		type: String,
		default: 'No',
		choices: [ 'No', 'Yes' ],
		widget: 'select'
	},
	eligibleBusinessLocation: [{
		type: String,
		required: true,
		choiceOther: false,
		widget: 'radio',
		choices: [
		  'Anywhere In Puerto Rico',
		  'Municipality in Puerto Rico',
		  'Region in Puerto Rico',
		  'Outside of Puerto Rico'
		]
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
    choices: [
      'Tax Break',
      'Loan',
      'Credit',
      'Grant',
      'Reimbursement',
      'Salary Reimbursement',
      'Exemption',
      'Other'
    ],
  }],
	benefitDescription: [{ type: String, required: true, widget: 'textArea' }],
	agency: {
		name: { type: String, required: true, label: 'Agency Name' },
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
      choices: ['one', 'two']
    }],
		currentEmployeesRequired: {
      type: String,
      widget: 'multiSelect',
      required: true,
      choices: ['one', 'two']
    },
		annualRevenue: {
      type: String,
      widget: 'multiSelect',
      choices: ['one', 'two']
    },
		eligibleIndustries: [{
			type: String,
			required: true,
			widget: 'multiSelect',
      choices: ['one', 'two']
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
  //console.log(form.fields);
  return form.fields;
}

opSchema.statics.getAdminVisibilityList = function(op) {
  // Exclude from edit = exclude=true
  // Include in list = includeList=true
  var opKey = op == 'list' ? 'includeList' : 'exclude';
	var visibility = [];
  var paths = opSchema.paths;
  var excludeAllways = ['__v', '_id'];
  _.each(paths, function(path, pathIndex) {
    if (!_.contains(excludeAllways, pathIndex)) {

      if (path.options.includeList && op == 'list')
        visibility.push(pathIndex);

      if (!path.options.exclude && op == 'edit')
        visibility.push(pathIndex);
    }
  });

  //console.log('OP: ' + op);
 // console.log(visibility);
  return visibility;
}


var opModel = mongoose.model('Opportunity', opSchema);

/**
 * Register model in admin
 */

// TODO refactor this shit.
admin.add({
  path: 'opportunities',
  model: 'Opportunity',
  list: opModel.getAdminVisibilityList('list'),
  edit: opModel.getAdminVisibilityList('edit'),
  fields: opModel.buildFormFields()
});


module.exports = opModel;
