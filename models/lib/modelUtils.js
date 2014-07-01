var _ = require('lodash');
var choicesList = require('../../lib/options.js');
// TODO this should be implemented in the proper pattern:
// http://book.mixu.net/node/ch6.html
var fieldBlackList = {
  edit: [
    'id',
    'createdAt',
    'updatedAt'
  ],
  new: [
    'id',
    'createdAt',
    'updatedAt'
  ],
};

var classMethods = {
  getFormFields: function(op, model) {
    var op = op || 'new';
    var blacklist = fieldBlackList[op];
    var fieldList = {};
    _.each(this.rawAttributes, function(element, key) {
      if (!_.contains(blacklist, key)) {
        // Set some properties
        console.log(key);
        element.name = key;

        if (op == 'edit')
          element.value = model.get(key)

        element.widget = element.widget ? element.widget : 'text';
        fieldList[key] = element;
      }
    });
    return fieldList;
  },
  buildFromAdminForm: function(reqBody) {
    var fields = this.getFormFields('new');
    var modelData = {};
    _.each(fields, function(fieldInfo, fieldKey) {
      if(!_.isUndefined(reqBody[fieldKey])) {
        var value = reqBody[fieldKey];
        // Get value from 'other' text fields if necessary
        if (value == 'other' && reqBody[fieldKey+'-other'] !== '') {
          value = reqBody[fieldKey+'-other'];
          value = choicesList.optionizeValue(value);
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
  }
};

var instanceMethods = {
};

var hooks = {};

var utils = {
  classMethods: classMethods,
  instanceMethods: instanceMethods,
  hooks: hooks,
  fieldBlackList: fieldBlackList,
}
exports = module.exports = utils;
