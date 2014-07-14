var _ = require('lodash');
var S = require('string');


function SearchQuery(queryBody) {
  this.queryBody = queryBody;
  // I'm going to be very simple here.  I'm going to run searches directly on the object.
  // To be enhanced as needed.
  this.where = constructWhere();
}

SearchQuery.prototype.constructWhere = function() {
  var where = {};
  _.each(this.queryBody, function(element, index) {
    where = _.extend(where, SearchQuery.getElementWhere(element, index));
  });

  return where;
}

SearchQuery.getElementWhere = function(element, index) {
  var elWhere = {};
  elWhere[index] = element;
  return elWhere;
};

/*SearchQuery.prototype.something = function() {
    return "Hi, I'm " + this.name;
};*/

//SearchQuery.getWhereMap = function(dd

module.exports = SearchQuery;
