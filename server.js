/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var compress = require('compression');
var logger = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

// Utilities.
var _ = require('underscore');
var request = require('request');
var qs = require('querystring');
var solr = require('solr-client');
var url = require('url');
var moment = require('moment'); // momentjs.com
var S = require('string'); // stringjs.com

// @TODO session handling / cookieparser
// @TODO user management
// @TODO csrf protection
// @TODO Express Compress?
// @TODO Logging?
// @TODO errorHandler.
// @TODO Express Validator
// @TODO Passport
// @TODO -- http-auth


var config = require('./config/config.js');

/**
 * Load controllers.
 */
//var apiController = require('./controllers/api');


/**
 * Create Express server.
 */
var app = express();

/**
 * Mongoose configuration.
 */
mongoose.connect(config.db);
mongoose.connection.on('error', function() {
  console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
});

/**
 * Express configuration.
 */

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

// Settings.
app.set('port', process.env.PORT || 3000);

// Middleware.
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Pre Route.

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

/**
 * Boot Solr
 */
var solr_client = solr.createClient();
solr_client.autoCommit = true; // Switch on "auto commit"


/**
 * Application routes.
 */

// @TODO -- integrate routing with http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4

// Versioning = anti pattern. Breaking changes should be done by route alteration.
app.get('/', function(req, res) {
  res.send('FBOpen APi v0. See http://docs.fbopen.apiary.io for initial documentation.');
});

app.get('/v0/hello', function(req, res){
  res.send('Hello World');
});

/**
 * 500 Error Handler.
 * As of Express 4.0 it must be placed at the end of all routes.
 */

app.use(errorHandler());


/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log("✔ Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});

module.exports = app;
