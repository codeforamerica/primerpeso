var OppQueryForm = require('../lib/OppQueryForm.js');
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
  var oppQueryForm = new OppQueryForm();
  res.render('fundmeWizard', {
    title: 'Wizard',
    bodyClass: 'fundmeWizard',
    form: oppQueryForm.getFormConfig(true), // Deep.
    formInfo: oppQueryForm.getFormConfig(false) // Shallow.
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
