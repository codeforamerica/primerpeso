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

var buildElement = function(element, op, includeRefValues, modelInstance) {
}

// Handle reference fields.
// TODO -- this only handles belongsTo associations
var buildRefElement = function(element, model) {
  var refedModel = _.find(model.associations, function(association, index) {
    return association.options.foreignKey === element.fieldName;
  });
  refedModel = refedModel.target;
  return refedModel.findAll().success(function(modelInstances) {
    console.log('findall success');
    var instanceList = {};
    _.each(modelInstances, function(modelInstance, index) {
      // TODO -- not sustainable to call by name.
      instanceList[modelInstance.get('id')] = modelInstance.get('name');
    });
    element.choices = instanceList;
    return element;
  });
}

var classMethods = {
  // Parses raw attributes of model and generates fields based on them as well as operation.
  getFormFields: function(op, modelInstance) {
    var op = op || 'list';
    var blacklist = fieldBlackList[op];
    if (op === 'list')
      return _.omit(_.keys(this.rawAttributes), blacklist);

    var modelInstance = modelInstance || null;
    var choicesList = new OptionsList();
    var refPromises = [];

    var fieldList = _.mapValues(this.rawAttributes, function(element, index) {
      element.widget = element.widget ? element.widget : 'text';
      element.name = element.fieldName;
      element.value = null;
      element.otherValue = null;
      var choices = choicesList.getFormChoices(index);
      element.choices =  _.isEmpty(choices) ? element.choices : choices;
      if (op == 'edit' && modelInstance) {
        var valueSet = buildElementValues(element, modelInstance.get(index));
        element.value = valueSet.value;
        element.otherValue = valueSet.otherValue;
      }

      return _.omit(element, ['Model', 'type']);
    }, this);

    // Get reference options.
    _.each(_.where(fieldList, { 'widget': 'ref' }), function(refElement) {
      refPromises.push(buildRefElement(refElement, this));
    }, this);

    return Promise.all(refPromises).then(function(refElementsWithChoices) {
      console.log('all promiss fulfill');
      // Override all previous elements with the ones returned from promise.
      _.each(refElementsWithChoices, function(element) {
        fieldList[element.name] = element;
      });
      return _.omit(fieldList, blacklist);
    });
  },

  // Gets default fields for a model in a list view.
  getDefaultFields: function() {
    var formFields = this.getFormFields('list');
    return _.mapValues(formFields, function(element, index) {
      return element.label;
    });
  },

  // Build the submission from the admin form submitted.
  buildFromAdminForm: function(reqBody) {
    var fields = this.getFormFields('list');
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
