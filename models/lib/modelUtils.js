var _ = require('lodash');
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
  getFormFields: function(op) {
    var op = op || 'new';
    var blacklist = fieldBlackList[op];
    var fieldList = {};
    _.each(this.rawAttributes, function(element, key) {
      if (!_.contains(blacklist, key)) {
        // Set some properties
        element.name = key;
        element.widget = element.widget ? element.widget : 'text';
        fieldList[key] = element;
      }
    });
    return fieldList;
  },
  buildFromAdminForm: function(req, res) {
    var fields = _.keys(this.getFormFields('new'));
    console.log(fields);
    var modelData = {};
    _.each(fields, function(fieldKey) {
      if(!_.isUndefined(req.body[fieldKey])) {
        modelData[fieldKey] = req.body[fieldKey];
      }
    });
    var instance = this.build(modelData);
    return instance;
  },
};

var instanceMethods = {
};

var utils = {
  classMethods: classMethods,
  instanceMethods: instanceMethods,
  fieldBlackList: fieldBlackList,
}
exports = module.exports = utils;
