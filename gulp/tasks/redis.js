var gulp = require('gulp');
var bg = require('gulp-bg');

gulp.task('redis', bg('redis-server'));
