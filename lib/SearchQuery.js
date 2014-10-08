var _ = require('lodash');
var S = require('string');
var moment = require('moment');
var db = require('../models');
var sequelize = db.sequelize;
var Opportunity = sequelize.model('opportunity');
var Agency = sequelize.model('agency');
var Requirement = sequelize.model('requirement');
var OptionsList = require('./OptionsList');
// Get object to work with node-sql against.
// Caching should be ok here!
// Define
var opDataSet = Opportunity.dataset();
var agencyDataSet = Agency.dataset();
var reqDataSet = Requirement.dataset();
var opportunitiesrequirements = reqDataSet.sql.define({
  name: 'opportunitiesrequirements',
  columns: ['createdAt', 'updatedAt', 'requirementId', 'opportunityId']
});

function SearchQuery(queryBody) {
  this.queryBody = queryBody;
  this.query = opDataSet.select(opDataSet.id);
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
    .then(function(result) {
      var idIN =  _.map(result, function(element, index) {
        return element.id;
      });
      return Opportunity.findAllFull( { where: { id: { in: idIN } } } );
    }).success(function(result) {
      self.result = result;
    });
}


// Expose formatResult as class method.
SearchQuery.prototype.formatResult = function() {
  var inFormat = 'ddd MMM DD YYYY HH:mm:ss ZZ';
  var outFormat = 'MMM Do YYYY';
  return _.map(this.result, function(resultOp, index) {
    resultOp.name = S(resultOp.title).trim().stripPunctuation().camelize().s;
    resultOp.title = S(resultOp.title).capitalize().s;
    resultOp.deadline = moment(resultOp.applicationDeadline, inFormat).format(outFormat);
    return resultOp;
 });

}

SearchQuery.extractBenefitTypes = function(result) {
  var benefitTypes = {};
  _.each(result, function(element, index) {
    _.each(element.benefitType, function(benType) {
      var bt = OptionsList.deOptionizeValue(benType, 'benefitType');
        if (!benefitTypes[benType] && bt)
          benefitTypes[benType] = bt;
    });
  });
  return benefitTypes;
}

SearchQuery.structureResultByBenefitType = function(benefitTypes, result) {
  return _.mapValues(benefitTypes, function(bt, btIndex) {
    var benMap = {};
    _.each(result, function(program, pIndex) {
      if (_.contains(program.benefitType, btIndex))
        benMap[program.id] = program;
    });
    return benMap;
  });
}

function augmentQueryWithElement(self, element, index) {
  switch (index) {
    case 'gender':
      if (element == 'male' || element == 'female')
        self.query.where(opDataSet.gender.in([element, 'any', 'other']));
      else if (element == 'other' || element == 'any')
        self.query.where(opDataSet.gender.in([element, 'any', 'other', 'male', 'female']));
      break;
    case 'age':
      /*if (element == 'male' || element == 'female')
        self.query.where(opDataSet.gender.in([element, 'any', 'other']));
      else if (element == 'other' || element == 'any')
        self.query.where(opDataSet.gender.in([element, 'any', 'other', 'male', 'female']));*/
      console.log(index);
      console.log(element);
      break;
  }
};


module.exports = SearchQuery;
