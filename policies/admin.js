var url = require('url');

module.exports = function(req, res, next) {
  if (!req.user) {
    req.flash('errors', { msg: 'You are not authorized to enter admin interface.'} );
    return res.redirect('/login');
  }

  return next();
}
