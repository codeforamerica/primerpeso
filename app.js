/**
 * Module dependencies.
 */

// Load dotenv.
var dotenv = require('dotenv');
dotenv.load();

var _ = require('lodash');
var express = require('express');
var i18n = require('i18n');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var csrf = require('lusca').csrf();
var methodOverride = require('method-override');

var RedisStore = require('connect-redis')(session);
var flash = require('express-flash');
var path = require('path');
var passport = require('passport');
var expressValidator = require('express-validator');
var db = require('./models');
var favicon = require('serve-favicon');

/**
 * Load controllers.
 */

// @TODO -- dep this
//var userController = require('./controllers/user');

/**
 * API keys + Passport configuration.
 */

var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

/**
 * Create Express server.
 */

var app = express();



/**
 * CSRF Whitelist
 */
var csrfExclude = ['/results/pick'];

/**
 * Express configuration.
 */

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

i18n.configure({
  locales: ['es'],
  defaultLocale: 'es',
  //cookie: 'pplocalecookie',
  directory: './locales',
  indent: "  ",
  updateFiles: true,
  objectNotation: true
});


app.use(favicon(__dirname + '/public/build/img/favicon.ico'));

app.use(i18n.init);


app.use(function(req, res, next) {
  //console.log(req.getLocale());
  return next();
});

app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  secret: secrets.sessionSecret,
  saveUninitialized: true,
  resave: true,
  store: new RedisStore({
    url: secrets.redis
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  if (_.contains(csrfExclude, req.path)) return next();
  else csrf(req, res, next);
});

// Set up locals via middleware
app.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.path = req.path;
  res.locals.env  = app.get('env');
  res.locals._ = require('lodash');
  res.locals.moment = require('moment');
  res.locals.oppCount = 0;
  res.locals.CDN = function(relPath) {
    return secrets.staticFilePrefix + relPath;
  }
  res.locals.gaNum = secrets.gaNum;
  next();
});

app.use(flash());


/**
 * Static
 */
//app.use('/search', express.static(path.join(__dirname, 'client/build'), { maxAge: 0 }));
//app.use(express.static(path.join(__dirname, 'public'), { maxAge: 0 }));
app.use(express.static(path.join(__dirname, 'public/build'), { maxAge: 0 }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 0 }));

app.use(function(req, res, next) {
  // Keep track of previous URL to redirect back to
  // original destination after a successful login.
  if (req.method !== 'GET') return next();
  var path = req.path.split('/')[1];
  if (/(auth|login|logout|signup)$/i.test(path)) return next();
  req.session.returnTo = req.path;
  next();
});

// Middleware to remove trailing slashes from urls.
app.use(function(req, res, next) {
  if (req.path.substr(-1) == '/' && req.path.length > 1) {
    var query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});

// Access Policy;
//app.use('/admin', require('./policies/admin'));

/**
 * Sub Apps
 */
//app.use('/search', require('./search'));

/**
 * Application routes.
 */

require('./controllers/user')(app);
require('./controllers/home')(app);
require('./controllers/oppquery')(app);
require('./controllers/admin')(app);
require('./controllers/contact')(app);


/**
 * Sequelize
 */
db.sequelize.sync({ force: false }).complete(function(err) {
    if (err) throw err;
    else console.log('OK');
});

/**
 * 500 Error Handler.
 * As of Express 4.0 it must be placed at the end, after all routes.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
  console.log("✔ Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});

module.exports = app;
