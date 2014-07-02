/* 
  Gulp task to run migrations
*/

var gulp = require('gulp');
var db = require('../../models');

gulp.task('migrate', function() {

  var migrator = db.sequelize.getMigrator({
    path:        process.cwd() + '/migrations',
  });

  migrator.migrate();

});
