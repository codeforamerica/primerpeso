var _ = require('lodash');
var OptionsList = require('../../lib/OptionsList.js');
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
  getFormFields: function(op, model) {
    var choicesList = new OptionsList();
    var op = op || 'new';
    var blacklist = fieldBlackList[op];
    var fieldList = {};
    _.each(this.rawAttributes, function(element, key) {
      if (!_.contains(blacklist, key)) {
        // Set some properties.
        //console.log(key);
        //console.log(model.get(key));
        element.name = key;

        // TODO -- this is an abomination.
        element.value = null
        element.otherValue = null;

        if (op == 'edit') {
          var valueSet = buildElementValues(element, model.get(key));
          element.value = valueSet.value;
          element.otherValue = valueSet.otherValue;
        }
        if (key == 'gender') {
          var choices = choicesList.getFormChoices(key);
          element.choices =  _.isEmpty(choices) ? element.choices : choices;
        }
        var choices = choicesList.getFormChoices(key);
        element.choices =  _.isEmpty(choices) ? element.choices : choices;
        element.widget = element.widget ? element.widget : 'text';
        fieldList[key] = element;
      }
    });
    return fieldList;
  },
  getDefaultFields: function() {
    var defaultFields = {};
    var formFields = this.getFormFields('new');
    return _.mapValues(formFields, function(element, index) {
      return element.label;
    });
  },
  buildFromAdminForm: function(reqBody) {
    var fields = this.getFormFields('new');
    var modelData = {};
    _.each(fields, function(fieldInfo, fieldKey) {
      if(!_.isUndefined(reqBody[fieldKey])) {
        var value = reqBody[fieldKey];
        // Get value from 'other' text fields if necessary
        if (value == 'other' && reqBody[fieldKey+'Other'] !== '') {
          value = reqBody[fieldKey+'Other'];
          value = OptionsList.optionizeValue(value);
        };

        // Wrap val if needed for multiple fields.
        if (fieldInfo.multiple == true && !_.isArray(value) && !_.isEmpty(value)) {
          value = [value];
        }

        modelData[fieldKey] = value;
      }
    });
    var instance = this.build(modelData);
    return instance;
  },

  createInstance: function(body) {
    // We can depend on this because it's getting covered in another test.
    var instance = this.buildFromAdminForm(body);
    // NOW THIS IS HOW YOU DO PROMISES!
    return instance.validate().then(function(err) {
      if (err) throw(err);
        return instance.save();
    }).then(function(savedInstance) {
      // This section is probably not needed.
      return savedInstance;
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
