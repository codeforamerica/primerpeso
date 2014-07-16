var _ = require('lodash');
var S = require('string');
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
    dataset.avgApplicationTime.as('estimatedTime'),
    dataset.applicationDeadline.as('deadline'),
    dataset.benefitDescription.as('description'),
    dataset.benefitType,
    dataset.id.as('name') // placeholder for machine name for now
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
  console.log("SQL");
  console.log(sql);
  return sequelize.query(sql, Opportunity);
}

function augmentQueryWithElement(self, element, index) {
  console.log('index');
  console.log(index);
  console.log('element');
  console.log(element);
  switch (index) {
    case 'gender':
      if (element == 'male' || element == 'female')
        self.query.where(dataset.gender.in(['male', 'female']));


      break;
  }
};


module.exports = SearchQuery;
