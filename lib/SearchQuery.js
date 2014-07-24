var _ = require('lodash');
var S = require('string');
var moment = require('moment');
var db = require('../models');
var sequelize = db.sequelize;
var Opportunity = sequelize.model('opportunity');
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
  return sequelize.query(sql, Opportunity, { raw: true })
    .success (function(result) {
      // Structure and format the result.
      return SearchQuery.structureResult(result, true);
    });
}

SearchQuery.structureResult = function(result, format) {
  var result = result || {};
  var fResult = {};
  var format = format || false;
  _.each(result, function(resultOp, index) {
    // Format result if asked for.
    if (format == true)
      SearchQuery.formatResult(resultOp);
    _.each(resultOp.benefitType, function(benefit, bIndex) {
      fResult[benefit] = fResult[benefit] || {};
      fResult[benefit][resultOp.name] = resultOp;
    });
  });
  return fResult;
}

// Expose formatResult as class method.
SearchQuery.formatResult = function(resultOp) {
  var outFormat = 'MMM Do YYYY';
  var inFormat = 'ddd MMM DD YYYY HH:mm:ss ZZ';
  resultOp.name = S(resultOp.name).trim().stripPunctuation().camelize().s;
  resultOp.title = S(resultOp.title).capitalize().s;
  resultOp.deadline = moment(resultOp.deadline, inFormat).format(outFormat);
}

function augmentQueryWithElement(self, element, index) {
  console.log('index');
  console.log(index);
  console.log('element');
  console.log(element);
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
