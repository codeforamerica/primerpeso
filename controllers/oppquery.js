var OppQuery = require('../models/OppQuery');
var Opp = require('../models/Opportunity');

module.exports = function(app) {
  app.get('/fundme', oppQueryCreate);
  app.get('/fundme.json', oppQueryCreateJson);
  app.get('/oppquery/execute', oppQueryExecute);
};

/**
 * GET /fundme
 * FundMe Wizard.
 */

var oppQueryCreate = function(req, res, next) {
  var formRenderObject = OppQuery.buildForm({ unflatten: true });
  res.render('fundmewizard', {
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
  res.json(req.query);
  /*var query = new OppQuery({ query: req.query });
  query.save(function(err, savedQuery){
    // Execute search here, render results;
    res.json(savedQuery);
  });*/
};
