var _ = require('lodash');
var S = require('string');

var mixins = {
  getFormConfig: function(full) {
    // Assume full config unless told otherwise.
    var full = full || true;
    if (full == true) {
      this.formConfig.fields = _.mapValues(this.formConfig.fields, function(fieldSet, fieldSetKey) {
        fieldSet = _.mapValues(fieldSet, function(field, fieldKey) {
          field.name = fieldKey;
          return field;
        });
        return fieldSet;
      });
      return this.formConfig;
    }
    else {
      var formInfo = _.cloneDeep(this.formConfig);
      formInfo.fields = _.mapValues(formInfo.fields, function(fieldSet, fieldSetKey) {
        fieldSet = _.mapValues(fieldSet, function(field, fieldKey) {
          newField = field;
          delete newField['type'];
          delete newField['label'];
          delete newField['choices'];
          return newField;
        });
        return fieldSet;
      });
      return formInfo;
    }
  }
}

exports = module.exports = mixins;
