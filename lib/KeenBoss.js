var path = require('path');
var _ = require('lodash');
var S = require('string');
var Keen = require('keen.io');
var Promise = require('bluebird');
var secrets = require('../config/secrets');
var OptionsList = require('./OptionsList');
var optionsList = new OptionsList();

function KeenBoss() {
  this.client = null;
  // Don't initialize the boss if keys are missing to avoid dev problems.
  if (secrets.keen.projectId && secrets.keen.writeKey) {
    this.client = Keen.configure({
      projectId: secrets.keen.projectId,
      writeKey: secrets.keen.writeKey
    });
    this.client.addEventAsync = Promise.promisify(this.client.addEvent);
  }
}

KeenBoss.prototype.addEvent = function(collection, data) {
  if (!this.client) {
    console.log('NOTE: KEEN IS NOT ENABLED');
    return Promise.resolve(true);
  }
  if (collection === 'submissions') {
    data.selectedPrograms = _.map(data.selectedPrograms, function(program) {
      return program.title;
    });
    data.subSaveData = _.omit(data.subSaveData, ['name', 'phone', 'email', 'address', 'legalCompanyName']);
    data.subSaveData = _.mapValues(data.subSaveData, function(element, index) {
      if (_.contains([
        'businessType',
        'yearsInBusiness',
        'annualRevenue',
        'age',
      ], index)) {
        return OptionsList.deOptionizeValue(element, index);
      }
      else if (index === 'employeeNumber') {
        return OptionsList.deOptionizeValue(element, 'currentEmployeesRequired');
      }
       else if (index === 'industry') {
        return OptionsList.deOptionizeValue(element, 'eligibleIndustries');
      }
      else {
        return element;
      }
    });
  }
  return this.client.addEventAsync(collection, data).then(function() {
    return data;
  });
}

module.exports = KeenBoss;


