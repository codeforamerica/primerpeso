var _ = require('underscore');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');
var User = db.sequelize.model('user');
var secrets = require('./secrets');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('des1');
  User.find(id).success(function(user) {
    console.log(user);
    console.log('calling done');
    done(null, user);
  }).error(function(err) {
    done(err, null);
  });
});


// Sign in using Email and Password.

passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  console.log('local strategy');
  User.find({ where: { email: email } }).success(function(user) {
    if (!user) return done(null, false, { message: 'Email ' + email + ' not found' });
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        console.log('match');
        return done(null, user);
      } else {
        console.log('unmatch');
        return done(null, false, { message: 'Invalid email or password.' });
      }
    });
  });
}));

// Login Required middleware.

exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};

// Authorization Required middleware.

exports.isAuthorized = function(req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];

  if (_.findWhere(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect('/auth/' + provider);
  }
};
