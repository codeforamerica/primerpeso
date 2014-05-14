var OppQuery = require('../models/OppQuery');
var OpModel = require('../models/Opportunity');

module.exports = function(app) {
  app.get('/', index);
  app.get('/monkey', test);
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


var test = function(req, res) {
  res.json(OpModel.getEditFormFields());
};
