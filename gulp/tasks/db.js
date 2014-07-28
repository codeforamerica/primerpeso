var gulp = require('gulp');
var config = require('../config');
var db = require('../../models');

gulp.task('dbsync', function() {
  return db.sequelize.sync({ force: false }).complete(function(err) {
    if (err) throw err;
    else console.log('DB SYNC OK');
    return;
  });
});
