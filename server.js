/**
 * Module dependencies.
 */
var express = require('express');
var cors = require('cors');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var elasticsearch = require('elasticsearch');
var compress = require('compression');
var logger = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

// Utilities.
var _ = require('underscore');
var request = require('request');
var qs = require('querystring');
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


var config = require('./server/config/config.js');


/**
 * Create Express server.
 */

var server = express();

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
server.set('port', process.env.PORT || 3000);

// Middleware.
server.use(compress());
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

// Allow cross-site queries (CORS)
server.use(cors());

// Pre Route.
server.options('*', function(req, res) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, X-Prototype-Version, Authorization',
    'Content-Type': 'application/json;charset=utf-8'
  });
  res.send('supported options: GET, OPTIONS [non-CORS]');
});

// Statics
// @TODO -- clean me up biatch
server.use('/', express.static(path.join(__dirname, 'client')));
//server.use('/dist', express.static(path.join(__dirname, 'dist')));

/**
 *  Boot Elastic Search
 */
var elasticClient = new elasticsearch.Client({
  host: 'localhost:9200', // for some reason 9300 causes errors.
  log: 'trace'
});

/**
 * Application routes.
 */
// Versioning = anti pattern. Breaking changes should be done by route alteration.
// @TODO -- verify routing practices are in check with express 4 routing pattern.

require('./server/controllers/opportunity')(server, elasticClient);



/**
 * 500 Error Handler.
 * As of Express 4.0 it must be placed at the end of all routes.
 */

server.use(errorHandler());


/**
 * Start Express server.
 */
server.listen(server.get('port'), function() {
  console.log("✔ Express server listening on port %d in %s mode", server.get('port'), server.get('env'));
});

module.exports = server;
