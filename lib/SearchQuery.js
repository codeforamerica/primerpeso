var _ = require('lodash');
var S = require('string');
var moment = require('moment');
var db = require('../models');
var sequelize = db.sequelize;
var Opportunity = sequelize.model('opportunity');
var OptionsList = require('./OptionsList');
// Get object to work with node-sql against.
// Caching should be ok here!
var dataset = Opportunity.dataset();

function SearchQuery(queryBody) {
  this.queryBody = queryBody;
  this.query = dataset.select(
    dataset.id,
    dataset.title,
    dataset.gender,
    dataset.avgApplicationTime.as('estimatedTime'),
    dataset.applicationDeadline.as('deadline'),
    dataset.benefitDescription.as('description'),
    dataset.benefitType,
    dataset.purpose.as('purpose'),
    dataset.paperworkRequired.as('paperwork'),
    dataset.agencyName.as('agencyName'),
    dataset.applicationCost.as('cost'),
    dataset.additionalGeneralInformation.as('info'),
    dataset.title.as('name') // placeholder for machine name for now
  );
  // Beging augmenting the query.
  _.each(this.queryBody, function(element, index) {
    augmentQueryWithElement(this, element, index);
  }, this);
}

SearchQuery.prototype.getQuerySql = function() {
  var queryGenerated = this.query.toString();
  return queryGenerated;
}

SearchQuery.prototype.execute = function() {
  var sql = this.getQuerySql();
  var self = this;
  return sequelize.query(sql, Opportunity, { raw: true })
    .success(function(result) {
      self.result = result;
    });
}

SearchQuery.prototype.getBenefitTypes = function() {
  var benefitTypes = {};
  _.each(this.result, function(element, index) {
    _.each(element.benefitType, function(benType) {
      var bt = OptionsList.deOptionizeValue(benType, 'benefitType');
        if (!benefitTypes[benType] && bt !== null)
          benefitTypes[benType] = bt;
    });
  });
  return benefitTypes;
}

// Expose formatResult as class method.
SearchQuery.prototype.formatResult = function() {
  var inFormat = 'ddd MMM DD YYYY HH:mm:ss ZZ';
  var outFormat = 'MMM Do YYYY';
  return _.map(this.result, function(resultOp, index) {
    resultOp.name = S(resultOp.name).trim().stripPunctuation().camelize().s;
    resultOp.title = S(resultOp.title).capitalize().s;
    resultOp.deadline = moment(resultOp.deadline, inFormat).format(outFormat);
    return resultOp;
 });

}

SearchQuery.structureResultByBenefitType = function(benefitTypes, result) {
  return _.mapValues(benefitTypes, function(bt, btIndex) {
    return _.compact(_.map(result, function(program, pIndex) {
      if (_.contains(program.benefitType, btIndex))
        return program;

      return null;
    }));
});

}

function augmentQueryWithElement(self, element, index) {
  switch (index) {
    case 'gender':
      if (element == 'male' || element == 'female')
        self.query.where(dataset.gender.in([element, 'any', 'other']));
      else if (element == 'other' || element == 'any')
        self.query.where(dataset.gender.in([element, 'any', 'other', 'male', 'female']));
      break;
  }
};


module.exports = SearchQuery;
