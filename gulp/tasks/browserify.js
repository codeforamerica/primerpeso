/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify');
var watchify     = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var config       = require('../config');
var gutil        = require('gulp-util');
var _            = require('underscore');

gulp.task('browserify', function() {
	var bundleMethod = global.isWatching ? watchify : browserify;
  var bundleConfs = {
    main: {
		  entries: [config.src + '/js/main.js'],
		  extensions: ['.js'],
      outputFile: 'main.js',
      outputPath: config.dest + '/js/'
    },
  };

  var bundlers = [];

  var bundleUp = function() {
    _.each(bundleConfs, function(bundleConf, index) {
      var bundler = bundleMethod({
        // Specify the entry point of your app
        entries: bundleConf.entries,
        // Add file extentions to make optional in your requires
        extensions: bundleConf.extensions
      });
       // Log when bundling starts
		  bundleLogger.start();
      bundler
        // Enable source maps!
        .bundle({debug: true})
        // Report compile errors
        .on('error', handleErrors)
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specifiy the
        // desired output filename here.
        .pipe(source(bundleConf.outputFile))
        // Specify the output destination
        .pipe(gulp.dest(bundleConf.outputPath))
        // Log when bundling completes!
        .on('end', bundleLogger.end);
        bundlers.push(bundler);
    });
  }

  if(global.isWatching) {
    gutil.log('watching');
		// Rebundle with watchify on changes.
    _.each(bundlers, function(bundler, index) {
		  bundler.on('update', bundleUp);
    });
	}

	return bundleUp();

});
