var gulp = require('gulp');
var csvparse = require('csv-parse');
var fs = require('fs');

gulp.task('import', function() {
  var contents = fs.readFileSync('./test.csv', 'utf8');
  csvparse(contents, function(err, data) {
    fieldNames = data.shift();
    parsedData = []
    data.forEach(function(entry) {
      var parsedEntry = {};
      entry.forEach(function(field, index) {
        parsedEntry[fieldNames[index]] = field;
      });
      parsedData.push(parsedEntry);
    });
    console.log(parsedData);
  });
});
