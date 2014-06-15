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

    var nm = './node_modules';

    return es.concat(
      gulp.src([
        nm + '/jquery/dist/jquery.js',
        nm + '/lodash/dist/lodash.js',
        nm + '/backbone/backbone.js',
        nm + '/moment/moment.js',
        nm + '/swiftclick/js/libs/swiftclick.js'
      ])
        .pipe(concat("vendor.min.js"))
        .pipe(gulp.dest(config.dest + '/'))
      //gulp.src(bowerDep + '/normalize-css/normalize.css')
       // .pipe(gulp.dest('build/styles'))
    );
});
