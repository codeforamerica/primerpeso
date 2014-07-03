var gulp = require('gulp');

gulp.task('default', ['redis', 'migrate', 'watch']);
