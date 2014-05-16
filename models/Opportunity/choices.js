var _ = require('underscore');
var S = require('string');

var choiceSet = {
  canBeReappliedFor: ['No', 'Yes'],
};


exports = module.exports = function(fieldOptions) {
  var choices = fieldOptions.choices || [];
  if (_.isEmpty(choices)) {
    // Give function callback a priority;
    if (_.isFunction(choices))
      choices = choices(fieldOptions);

    if (!_.isEmpty(choiceSet[fieldOptions.name]))
      choices = choiceSet[fieldOptions.name];
  }

  return choices;
}

