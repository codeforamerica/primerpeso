var oppQueryForm = require('../lib/oppQueryForm.js');
var searchResults = require('../test/mocks/searchResults');
var Searcher = require('../lib/SearchQuery.js');

module.exports = function(app) {
  app.get('/fundme', oppQueryCreate);
  app.get('/results', oppQueryExecute);
};

/**
 * GET /fundme
 * FundMe Wizard.
 */
var oppQueryCreate = function(req, res, next) {
  var options = options || {};
  res.render('fundmeWizard', {
    title: 'Wizard',
    bodyClass: 'fundmeWizard',
    form: oppQueryForm.getFormConfig(),
    formInfo: oppQueryForm.getFormInfo()
  });
};

var oppQueryExecute = function(req, res, next) {
  var query = req.query;
  var searchResult = new Searcher(query);
  searchResult.execute().success(function(searchResult) {
    res.render('searchResults', {
      title: 'Search Results',
      bodyClass: 'searchResults',
      isSearch: true,
      searchResult: searchResult
    });
  });
};
