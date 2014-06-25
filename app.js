/**
 * Module dependencies.
 */

// Load dotenv.
var dotenv = require('dotenv');
dotenv.load();

var express = require('express');
var cors = require('cors');
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

var MongoStore = require('connect-mongo')({ session: session });
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var admin = require('./custom/fundme-admin');
var db = require('./models');

/**
 * Load controllers.
 */

// @TODO -- dep this
//var userController = require('./controllers/user');
var contactController = require('./controllers/contact');

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
 * Mongoose configuration.
 */

/*mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
});*/

/**
 * CSRF Whitelist
 */
// @TODO -- ya know.
var whitelist = ['/opportunity/create', '/', '/admin/Opportunities/new', '/admin/Opportunities'];

/**
 * Express configuration.
 */

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  secret: secrets.sessionSecret,
  store: new MongoStore({
    url: secrets.db,
    auto_reconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
/*app.use(function(req, res, next) {
  if (whitelist.indexOf(req.path) !== -1) next();
  else csrf(req, res, next);
});*/

// Set up locals via middleware
app.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.path = req.path;
  next();
});

app.use(flash());

// Allow cross-site queries (CORS)
app.use(cors());

// Pre Route.
app.options('*', function(req, res) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, X-Prototype-Version, Authorization',
    'Content-Type': 'application/json;charset=utf-8'
  });
  res.send('supported options: GET, OPTIONS [non-CORS]');
});

/**
 * Static
 */
//app.use('/search', express.static(path.join(__dirname, 'client/build'), { maxAge: 0 }));
//app.use(express.static(path.join(__dirname, 'public'), { maxAge: 0 }));
app.use(express.static(path.join(__dirname, 'public/build'), { maxAge: 0 }));

app.use(function(req, res, next) {
  // Keep track of previous URL to redirect back to
  // original destination after a successful login.
  if (req.method !== 'GET') return next();
  var path = req.path.split('/')[1];
  if (/(auth|login|logout|signup)$/i.test(path)) return next();
  req.session.returnTo = req.path;
  next();
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

//admin.config(app, mongoose, '/admin');


/**
 * Sequelize
 */
db.sequelize.sync({ force: false }).complete(function(err) {
    if (err) throw err;
    else console.log('OK');
});

/**
 * Middleware error helper.
 */

app.use(function(err, req, res, next) {
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

