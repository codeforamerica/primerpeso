var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', ['setWatch', 'nodemon', 'browserSync'], function() {
	gulp.watch(config.src + '/css/**', ['less']);
	gulp.watch(config.src + '/img/**', ['images']);
	// Note: The browserify task handles js recompiling with watchify
});
