var OppQuery = require('../models/OppQuery');
var Opp = require('../models/Opportunity');

module.exports = function(app) {
  app.get('/fundme', oppQueryCreate);
  app.get('/fundme.json', oppQueryCreateJson);
  app.get('/search', oppQueryExecute);
};

/**
 * GET /fundme
 * FundMe Wizard.
 */

var oppQueryCreate = function(req, res, next) {
  var formRenderObject = OppQuery.buildForm({ unflatten: true });
  res.render('fundmeWizard', {
    title: 'Wizard',
    bodyClass: 'fundmeWizard',
    form: formRenderObject
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
