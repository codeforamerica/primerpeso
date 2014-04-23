var express = require('express'),
  // express.js standard scaffolding components (some overkill here)
  routes = require('./routes'),
  http = require('http'),
  // https = require('https'),
  path = require('path'),
  http_auth = require('http-auth'),

  // other useful stuff
  request = require('request'),
  qs = require('querystring'),
  solr = require('solr-client'),
  url = require('url'),
  moment = require('moment'), // momentjs.com
  S = require('string'); // stringjs.com

var config = require('./config');

var app = express();

// http basic auth, if required in config
if (config.app.require_http_basic_auth) {
  var basic = http_auth.basic(config.app.http_basic_auth);
  app.use(http_auth.connect(basic));
}

// Create Solr client
var solr_client = solr.createClient();
solr_client.autoCommit = true; // Switch on "auto commit"

// all environments
// (express.js standard scaffolding -- see http://expressjs.com/guide.html#executable )
// some of this is unused/overkill at the moment
// app.set('port', config.app.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Allow cross-site queries (CORS)
app.get('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.options('*', function(req, res) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, X-Prototype-Version, Authorization',
    'Content-Type': 'application/json;charset=utf-8'
  });
  res.send('supported options: GET, OPTIONS [non-CORS]');
});

// Versioning = anti pattern. Breaking changes should be done by route alteration.
app.get('/v0/', function(req, res) {
  res.send('FBOpen APi v0. See http://docs.fbopen.apiary.io for initial documentation.');
});

app.get('/v0/hello', function(req, res){
  res.send('Hello World');
});
