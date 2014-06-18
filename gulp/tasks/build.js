var gulp = require('gulp');

gulp.task('build', ['browserify', 'vendor', 'less', 'images', 'copy']);
