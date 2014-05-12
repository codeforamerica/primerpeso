var OppQuery = require('../models/OppQuery');
var Opp = require('../models/Opportunity');

module.exports = function(app) {
  app.get('/fundme', oppQueryCreate);
  app.get('/oppquery/execute', oppQueryExecute);
};

/**
 * GET /fundme
 * FundMe Wizard.
 */

var oppQueryCreate = function(req, res, next) {
  res.render('fundmeWizard', {
    title: 'FundMe',
    bodyClass: 'fundmeWizard',
    form: OppQuery.getQueryForm()
  });
};

var oppQueryExecute = function(req, res, next) {
  var query = new OppQuery({ query: req.query });
  query.save(function(err, savedQuery){
    // Execute search here, render results;
    res.json(savedQuery);
  });
};
