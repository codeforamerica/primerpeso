/* 
  Gulp task to import csv files and convert them to JSON
  TODO: csv's are not well formed. Ask maksim how many there are to see if it's better to prettify JSON by hand
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
