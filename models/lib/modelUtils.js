var _ = require('lodash');
var moment = require('moment')
var OptionsList = require('../../lib/OptionsList.js');
var Promise = require('bluebird');
// TODO this should be implemented in the proper pattern:
// http://book.mixu.net/node/ch6.html
var fieldBlackList = {
  list: [
    'id',
    'createdAt',
    'updatedAt',
    'creatorId'
  ],
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


var buildElementValues = function(element, value, modelInstance) {
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
    if (!isArrayValue) {
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

var setAssociations = function(instance, nextFn) {
  // TODO -- am I being vulnerable because i'm not validating id of ref?
  // Return quick if no refs.
  if (!instance.refs)
    return nextFn(null, instance);

  var refPromises = [];
  _.each(instance.refs, function(fieldData, fieldIndex) {
    var associationKey = fieldData.fieldInfo.assocName || fieldData.fieldInfo.refTarget;
    var setter = instance.Model.associations[associationKey].accessors.set;
    refPromises.push(instance[setter](fieldData.value));
  });
  Promise.all(refPromises).then(function(){
    nextFn(null, instance);
  }).catch(function(e) {
    nextFn(e.message, instance);
  });
}

var classMethods = {
  buildAttributes: function(columnsOnly) {
    var columnsOnly = columnsOnly || false;
    var attributes = this._getAttributes();
    _.each(attributes, function(element, elementIndex) {
      if (!element.fieldName)
        element.fieldName = elementIndex;
    });
    if (columnsOnly === true) {
      return _.omit(attributes, function(attributeData, attributeName) {
        return _.isEmpty(attributeData.type);
      });
    }
    return attributes;
  },
  // Parses raw attributes of model and generates fields based on them as well as operation.
  getFormFields: function(op, modelInstance) {
    var op = op || 'list';
    var blacklist = fieldBlackList[op];
    // TODO -- return as resolved promise?
    if (op === 'list')
      return _.omit(this.rawAttributes, blacklist);

    var modelInstance = modelInstance || null;
    var choicesList = new OptionsList();

    //var fieldList = _.mapValues(this.rawAttributes, function(element, index) {
    var fieldList = _.mapValues(this.buildAttributes(false), function(element, index) {
      element.widget = element.widget ? element.widget : 'text';
      element.name = element.fieldName;
      element.value = null;
      element.otherValue = null;
      var choices = choicesList.getFormChoices(index);
      element.choices =  _.isEmpty(choices) ? element.choices : choices;
      if (op == 'edit' && modelInstance) {
        var valueSet = buildElementValues(element, modelInstance.get(index), modelInstance);
        element.value = valueSet.value;
        element.otherValue = valueSet.otherValue;
      }

      return _.omit(element, ['Model', 'type']);
    }, this);

    return _.omit(fieldList, blacklist);
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
    var refs = {};
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

        if (fieldInfo.widget !== 'ref')
          modelData[fieldKey] = value;
        // Associations.
        else
          refs[fieldKey] = { value: value, fieldInfo: _.omit(fieldInfo, ['Model', 'values']) };
      }
    });
    var instance = this.build(modelData);
    instance.refs = refs;
    return instance;
  },
  // Create instance based on admin form submission.
  createInstance: function(body) {
    // We can depend on this because it's getting covered in another test.
    var instance = this.buildFromAdminForm(body);
    return instance.validate().then(function(err) {
      if (err) throw(err);
      return instance.save();
    });
  },
  loadFull: function(options, queryOptions) {
    return this.find(options, queryOptions);
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

var hooks = {
  afterCreate: function(instance, nextFn) {
    setAssociations(instance, nextFn);
  },
  // TODO only run if changed.
  afterUpdate: function(instance, nextFn) {
    setAssociations(instance, nextFn);
  }
}

var utils = {
  classMethods: classMethods,
  instanceMethods: instanceMethods,
  hooks: hooks,
  fieldBlackList: fieldBlackList,
}
exports = module.exports = utils;
