var OppQueryForm = require('../lib/OppQueryForm.js');
var searchResults = require('../test/mocks/searchResults');
var Searcher = require('../lib/SearchQuery.js');

module.exports = function(app) {
  app.get('/fundme', oppQueryCreate);
  app.get('/results', oppQueryExecute);
  app.post('/results/pick', oppQueryPickResults);
};

/**
 * GET /fundme
 * Build and render FundMe Wizard.
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

/**
 * Get /results
 * Get the query request, execute, and redner the results page
 */
var oppQueryExecute = function(req, res, next) {
  var query = req.query;
  var searchResult = new Searcher(query);
  searchResult.execute().success(function(searchResult) {
    req.session.searchResult = searchResult;
    res.render('searchResults', {
      title: 'Search Results',
      bodyClass: 'searchResults',
      isSearch: true,
      searchResult: searchResult
    });
  });
};

/**
 * POST /results/pick
 * Receives the results from Cart's XHR request. Stores them in session.
 */
var oppQueryPickResults = function(req, res, next) {
  console.log(req.body);
  // TODO -- security hoooolllleeee?
  req.session.cartContents = req.body;
  return res.json(200, {status: 'ok'});
}
