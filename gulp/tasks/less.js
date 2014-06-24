var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var changed = require('gulp-changed');
var gutil        = require('gulp-util');
var config = require('../config.js');

gulp.task('less', function() {
  return gulp.src(config.src + '/css/styles.less')
    .pipe(changed(config.dest + '/css'))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(config.dest + '/css'))
    .on('error', gutil.log);
});
