var formSettings = require('../lib/oppQueryForm.js');

module.exports = function(app) {
  app.get('/fundme', oppQueryCreate);
  //app.get('/search', oppQueryExecute);
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
    form: formSettings.formConfig
  });
};


var oppQueryCreateJson = function(req, res, next) {
  var form = OppQuery.buildForm({ unflatten: true });
  res.json(form);
}

var oppQueryExecute = function(req, res, next) {
  res.render('searchResults', {
    title: 'Search Results',
    bodyClass: 'searchResults',
    isSearch: true
  });
};
