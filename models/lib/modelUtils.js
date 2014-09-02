var _ = require('lodash');
var moment = require('moment')

var OptionsList = require('../../lib/OptionsList.js');
var Promise = require('Sequelize').Promise;
// TODO this should be implemented in the proper pattern:
// http://book.mixu.net/node/ch6.html
var fieldBlackList = {
  edit: [
    'id',
    'createdAt',
    'updatedAt',
    'creatorId'
  ],
  new: [
    'id',
    'createdAt',
    'updatedAt',
    'creatorId'
  ],
};

var buildElementValues = function(element, value) {
  var isArrayValue = _.isArray(value);
  var valueSet = {
    value: isArrayValue ? [] : null,
    otherValue: isArrayValue ? '' : null
  };

  // Deal with other fields.
  if (!element.choiceOther) {
    valueSet.value = value;
    return valueSet;
  }

  if (element.choiceOther == true) {
    if (!isArrayValue){
      if (!_.isUndefined(element.choices[value]))
        valueSet.value = value;
      else
        valueSet.otherValue = value;
    }
    else {
      _.each(value, function(el, index) {
        if (!_.isUndefined(element.choices[el]))
          valueSet.value.push(el);
        else
          valueSet.otherValue += el;
      });
    }
  }
  return valueSet;
}

var classMethods = {
  // Parses raw attributes of model and generates fields based on them as well as operation.
  getFormFields: function(op, includeRefValues, modelInstance) {
    var includeRefValues = includeRefValues || false;
    var modelInstance = modelInstance || null;
    var choicesList = new OptionsList();
    var op = op || 'new';
    var blacklist = fieldBlackList[op];
    var fieldList = {};
    var refPromises = [];
    console.log(this.values);
    _.each(this.rawAttributes, function(element, key) {
      if (!_.contains(blacklist, key) && element.widget !== 'ref') {
        // Set some properties.
        element.name = key;
	console.log('KEY');
	console.log(key);
	console.log('endkey');

        // TODO -- this is an abomination.
        element.value = null
        element.otherValue = null;

        var choices = choicesList.getFormChoices(key);
        element.choices =  _.isEmpty(choices) ? element.choices : choices;
        element.widget = element.widget ? element.widget : 'text';

        // Handle reference fields.
        // TODO -- this only handles belongsTo associations
/*        if (element.widget === 'ref') {
          var refedModel = _.find(this.associations, function(association, index) {
            return association.options.foreignKey === element.name;
          });
          refedModel = refedModel.target;
          // Populate the list with available options.
	  if (includeRefValues)
            refPromises.push(refedModel.findAll());
	}*/

	if (op == 'edit' && modelInstance) {
	  var valueSet = buildElementValues(element, modelInstance.get(key));
          element.value = valueSet.value;
          element.otherValue = valueSet.otherValue;
        }
        var choices = choicesList.getFormChoices(key);
        element.choices =  _.isEmpty(choices) ? element.choices : choices;
        element.widget = element.widget ? element.widget : 'text';
        fieldList[key] = _.omit(element, ['Model', 'type']);
      }
    }, this);
    /*Promise.all(refPromises).then(function(results) {
      console.log('return field list');
      return fieldList;
    });*/
    return fieldList;
  },


  // Gets default fields for a model in a list view.
  getDefaultFields: function() {
    var formFields = this.getFormFields('new');
    return _.mapValues(formFields, function(element, index) {
      return element.label;
    });
  },

  // Build the submission from the admin form submitted.
  buildFromAdminForm: function(reqBody) {
    var fields = this.getFormFields('new');
    var modelData = {};
    _.each(fields, function(fieldInfo, fieldKey) {
      if(!_.isUndefined(reqBody[fieldKey])) {
        var value = reqBody[fieldKey];

        // Wrap val if needed for multiple fields.
        if (fieldInfo.multiple == true && !_.isArray(value) && !_.isEmpty(value)) {
          value = [value];
        }

        // Get value from 'other' text fields if necessary
        if (value == 'other' && !_.isEmpty(reqBody[fieldKey + 'Other'])) {
          otherVal = reqBody[fieldKey + 'Other'];
          otherVal = OptionsList.optionizeValue(otherVal);
          if (fieldInfo.multiple == true || _.isArray(value))
            value.push(otherVal);
          else
            value = reqBody[fieldKey + 'Other'];
        };

        modelData[fieldKey] = value;
      }
    });
    var instance = this.build(modelData);
    return instance;
  },
  // Create instance based on admin form submission.
  createInstance: function(body) {
    // We can depend on this because it's getting covered in another test.
    var instance = this.buildFromAdminForm(body);
    // NOW THIS IS HOW YOU DO PROMISES!
    return instance.validate().then(function(err) {
      if (err) throw(err);
      return instance.save();
    });
  }
};

var instanceMethods = {

  getFormatedValues: function() {
    var choicesList = new OptionsList();
    var formatedValues = {};
    _.each(this.dataValues, function(value, key) {
      if (_.isUndefined(choicesList['options'][key])) {
        formatedValues[key] = value;
      } else {
        if (!_.isArray(value)) {
          formatedValues[key] = choicesList['options'][key][value];
        } else {
          formatedValues[key] = [];
          for (var i = 0 ; i < value.length ; i++) {
            formatedValues[key].push(choicesList['options'][key][value[i]]);
          }
        }
      }
    });
    return formatedValues;
  }

};

var hooks = {};

var utils = {
  classMethods: classMethods,
  instanceMethods: instanceMethods,
  hooks: hooks,
  fieldBlackList: fieldBlackList,
}
exports = module.exports = utils;
