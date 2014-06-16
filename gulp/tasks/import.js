/* 
  Gulp task to import csv files and convert them to JSON
*/

var gulp = require('gulp');
var csv2json = require('gulp-csv2json');
var rename = require('gulp-rename');

gulp.task('import', function() {
  gulp.src('./test.csv')
    .pipe(csv2json())
    .pipe(rename({extname: '.json'}))
    .pipe(gulp.dest('.'));
});
