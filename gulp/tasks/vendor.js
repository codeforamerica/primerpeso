var fs     = require('fs'),
    gulp   = require('gulp'),
    es     = require('event-stream'),
    concat = require('gulp-concat'),
    config = require('../config');

/**
 * Build vendor, Concat and build our dependencies
 */

gulp.task('vendor', function() {

    "use strict";

    console.log(config);
    return es.concat(
      gulp.src(config.vendorJS)
      .pipe(concat("vendor.min.js"))
      .pipe(gulp.dest(config.dest + '/'))
    );
});
