var OppQuery = require('../models/OppQuery');

module.exports = function(app) {
  app.get('/', index);
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

