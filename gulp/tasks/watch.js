var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'nodemon', 'browserSync'], function() {
	//gulp.watch('src/sass/**', ['compass']);
	gulp.watch('src/images/**', ['images']);
	gulp.watch('src/htdocs/**', ['copy']);
 // gulp.watch('src/**', ['build']);
	// Note: The browserify task handles js recompiling with watchify
});
