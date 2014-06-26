
module.exports = function(app) {
  app.get('/', index);
};

/**
 * GET /
 * Home page.
 */

var index = function(req, res) {
  console.log('home controller');
  return res.render('home', {
    title: 'Home',
    bodyClass: 'home',
  });
};
