
module.exports = function(app) {
  app.get('/', index);
  app.get('/about', about);
};

/**
 * GET /
 * Home page.
 */

var index = function(req, res) {
  return res.render('home', {
    title: 'Home',
    bodyClass: 'home',
  });
};

var about = function(req, res) {
  return res.render('about', {
    title: 'About'
  });
};
