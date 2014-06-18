var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', ['setWatch', 'nodemon', 'browserSync'], function() {
	gulp.watch(config.src + '/css/**', ['less']);
	gulp.watch(config.src + '/img/**', ['images']);
	//gulp.watch('src/htdocs/**', ['copy']);
	// Note: The browserify task handles js recompiling with watchify
});
