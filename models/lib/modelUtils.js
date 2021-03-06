var _ = require('lodash');
var moment = require('moment')
var S = require('string');
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


var buildElementValues = function(element, modelInstance) {
  var value = modelInstance.get(element.name);
  if (!value && element.widget === 'ref') {
    value = getAssociation(element, modelInstance);
  }
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

var getAssociation = function(fieldInfo, modelInstance) {
  // TODO -- build in assoc for eager loads.
  var associationKey = fieldInfo.assocName || fieldInfo.refTarget;
  var getKey = modelInstance.Model.associations[associationKey].as;
  var associatedObjects = modelInstance[getKey];
  if (_.isArray(associatedObjects)) {
    return _.map(associatedObjects, function(object, index){
      return object.id;
    }).join(',');
  }
  return associatedObjects;
}

var setAssociations = function(instance, refs) {
  // TODO -- am I being vulnerable because i'm not validating id of ref?
  // Return quick if no refs.
  console.log('SET ASSOC');
  var refs = refs || {};
  var refPromises = [];
  _.each(refs, function(fieldData, fieldIndex) {
    var associationKey = fieldData.fieldInfo.assocName || fieldData.fieldInfo.refTarget;
    var setter = instance.Model.associations[associationKey].accessors.set;
    var value = fieldData.value;
    if (fieldData.multiple || _.isEqual(fieldData.value, ['[]']) || fieldData.value === '[]')
      value = [];

    refPromises.push(instance[setter](value));
  });
  return Promise.all(refPromises).then(function(setRes) {
    return instance;
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
    // Columns only = true if not listAll
    if (op === 'list' || op === 'listAll')
      return _.omit(this.buildAttributes(op === 'list'), blacklist);

    var modelInstance = modelInstance || null;
    var choicesList = new OptionsList();

    var fieldList = _.mapValues(this.buildAttributes(false), function(element, index) {
      element.widget = element.widget ? element.widget : 'text';
      element.name = element.fieldName;
      element.value = null;
      element.otherValue = null;
      var choices = choicesList.getFormChoices(index);
      element.choices =  _.isEmpty(choices) ? element.choices : choices;
      if (op == 'edit' && modelInstance) {
        var valueSet = buildElementValues(element, modelInstance);
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
    var fields = this.getFormFields('listAll');
    var modelData = {};
    var refs = {};
    _.each(fields, function(fieldInfo, fieldKey) {
      if(!_.isUndefined(reqBody[fieldKey])) {
        var value = reqBody[fieldKey];

       if (fieldInfo.type) {
          // @TODO -- fix the default value for date.
          if (fieldInfo.type.toString() === 'INTEGER')
            value = S(value).toInt();
          if (S(fieldInfo.type.toString().toLowerCase()).contains('time') &&
              !moment(value).isValid())
            value = '2019-12-27';
        }

        // Wrap val if needed for multiple fields.
        if (fieldInfo.multiple == true && !_.isArray(value) && !_.isEmpty(value)) {

          // Handle multiples in refs hidden input fields.
          // TODO make this better.
          if (fieldInfo.widget === 'ref')
            value = value.split(",");
          else
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
    return { modelData: modelData, refs: refs };
  },
  // Create instance based on admin form submission.
  createInstance: function(body) {
    // We can depend on this because it's getting covered in another test.
    var builtFromForm = this.buildFromAdminForm(body);
    var instance = this.build(builtFromForm.modelData);
    return instance.validate().then(function(err) {
      if (err) throw(err);
      return instance.save();
    }).then(function(instance) {
      return setAssociations(instance, builtFromForm.refs);
    });
  },
  // Update instance based on admin form submission.
  updateInstance: function(id, body) {
    // We can depend on this because it's getting covered in another test.
    var Model = this;
    var builtFromForm = Model.buildFromAdminForm(body);
    return Model.find(id).then(function(currentInstance) {
      return currentInstance.updateAttributes(builtFromForm.modelData);
    }).then(function(currentInstance) {
      return setAssociations(currentInstance, builtFromForm.refs);
    });
  },
  // TODO THIS DOES NOT WORK RIGHT __ THE EXTENDING
  loadFull: function(options, queryOptions) {
    return this.find(options, queryOptions);
  },
  findAllFull: function(options, queryOptions) {
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

var utils = {
  classMethods: classMethods,
  instanceMethods: instanceMethods,
  hooks: {},
  fieldBlackList: fieldBlackList,
}
exports = module.exports = utils;
