var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var config     = require('../config');
gulp.task('images', function() {
  var src  = config.src + '/img';
  var dest = config.dest + '/img';

	return gulp.src(src + '/**')
		.pipe(changed(dest)) // Ignore unchanged files
		.pipe(imagemin()) // Optimize
		.pipe(gulp.dest(dest));
});
