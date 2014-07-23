var OppQueryForm = require('../lib/OppQueryForm.js');
var SendRequestForm = require('../lib/SendRequestForm.js');
var searchResults = require('../test/mocks/searchResults');
var Searcher = require('../lib/SearchQuery.js');
var _ = require('lodash');

module.exports = function(app) {
  app.get('/fundme', oppQueryCreate);
  app.get('/results', oppQueryExecute);
  app.get('/results/picked/confirm', oppQueryConfirmPickedResults);
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
      displayCart: true,
      searchResult: searchResult
    });
  });
};

/**
 * POST /results/pick
 * Receives the results from Cart's XHR request. Stores them in session.
 */
var oppQueryPickResults = function(req, res, next) {
  // TODO -- security hoooolllleeee?
  // Recycle Searcher to format the incoming result from collection.
  // Don't re-format.
  req.session.cartContents = Searcher.structureResult(req.body, false);
  return res.json(200, {status: 'ok'});
}
/**
 * GET /results/picked/confirm
 * This is the page that successful cart save redirects to.
 * Checks for cart data, and if they exist, builds the confirm page.
 */

var oppQueryConfirmPickedResults = function(req, res, next) {
  var cartContents = req.session.cartContents || null;
  if (_.isEmpty(cartContents))
    return res.redirect('/fundme');

  var sendRequestForm = new SendRequestForm();
  return res.render('confirmPicked', {
    title: 'You Have Selected',
    bodyClass: 'confirmPickedResults',
    pickedResults: cartContents,
    form: sendRequestForm.getFormConfig(true),
  });
};
