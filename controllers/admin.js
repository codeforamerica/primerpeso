var OppQuery = require('../models/OppQuery');
var authPolicies = require('../policies/auth');

// TODO -- express routing the right way.
module.exports = function(app) {
  // Policy middleware.
  app.use('/admin', authPolicies.admin);
  app.get('/admin/new', index);
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

