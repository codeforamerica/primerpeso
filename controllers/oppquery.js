var oppQueryForm = require('../lib/oppQueryForm.js');
var searchResults = require('../test/mocks/searchResults');

module.exports = function(app) {
  app.get('/fundme', oppQueryCreate);
  app.get('/results/:filter', oppQueryExecute);
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


var oppQueryCreateJson = function(req, res, next) {
  var form = OppQuery.buildForm({ unflatten: true });
  res.json(form);
}

var oppQueryExecute = function(req, res, next) {
  var searchResult = searchResults();
  res.render('searchResults', {
    title: 'Search Results',
    bodyClass: 'searchResults',
    isSearch: true,
    searchResult: searchResult
  });
};
