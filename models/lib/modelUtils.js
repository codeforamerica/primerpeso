var _ = require('lodash');
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
  getFormFields: function(op) {
    var op = op || 'new';
    var blacklist = fieldBlackList[op];
    var fieldList = {};
    _.each(this.rawAttributes, function(element, key) {
      //console.log(key);
      //console.log(element);
      //console.log(element.type.toString());
      if (!_.contains(blacklist, key)) {
        // Set some properties
        element.name = key;
        element.widget = element.widget ? element.widget : 'text';
        fieldList[key] = element;
      }
    });
    return fieldList;
  }
};

var instanceMethods = {
  getFormFields: function() {
    console.log(this);
  }
};

var utils = {
  classMethods: classMethods,
  instanceMethods: instanceMethods,
  fieldBlackList: fieldBlackList,
}
exports = module.exports = utils;
