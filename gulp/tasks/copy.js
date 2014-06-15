var gulp = require('gulp');

gulp.task('copy', function() {
	return gulp.src('./client/src/index.html')
		.pipe(gulp.dest('./client/build/'));
});
