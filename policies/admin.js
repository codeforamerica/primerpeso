var url = require('url');

module.exports = function(req, res, next) {
  var locals = res.locals;
  var adminPath = req.path;
  console.log(req.path);
  console.log('run check');
  if (!req.user) {
    req.flash('errors', { msg: 'You are not authorized to enter Admin.'} );
    return res.redirect('/login');
  }

  return next();
}
