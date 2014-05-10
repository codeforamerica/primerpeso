var OppQuery = require('../models/OppQuery');

module.exports = function(app) {
  app.get('/', index);
  app.get('/fundme', fundmeWizard);
};

/**
 * GET /
 * Home page.
 */

var index = function(req, res) {
  res.render('home', {
    title: 'Home',
    bodyClass: 'home',
  });
};

var fundmeWizard = function(req, res, next) {
  res.render('fundmeWizard', {
    title: 'FundMe',
    bodyClass: 'fundmeWizard',
    form: OppQuery.getQueryForm()
  });

};
