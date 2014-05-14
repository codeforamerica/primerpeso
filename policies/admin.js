var url = require('url');

module.exports = function(req, res, next) {
  var locals = res.locals;
  var adminPath = req.path;
  if (!req.user) {
    req.flash('errors', { msg: 'You are not authorized to enter Admin.'} );
    return res.redirect('/login');
  }

  return next();
}
