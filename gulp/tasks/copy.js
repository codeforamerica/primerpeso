var gulp = require('gulp');
var config = require('../config');

gulp.task('copy', function() {
	return gulp.src(config.src + '/fonts/**')
		.pipe(gulp.dest(config.dest + '/fonts/'));
});
