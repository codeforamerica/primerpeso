var gulp = require('gulp');

gulp.task('build', ['browserify', 'vendor', /*'compass',*/ 'images', 'copy']);
