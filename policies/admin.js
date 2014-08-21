var url = require('url');

module.exports = function(req, res, next) {
  if (!req.user) {
    req.flash('errors', { msg: 'No estas autorizado para entrar al administrador de programas.'} );
    return res.redirect('/login');
  }

  return next();
}
