var gulp = require('gulp');
var config = require('../config');
var db = require('../../models');

gulp.task('dbsync', function() {
  db.sequelize.sync({ force: false }).complete(function(err) {
    if (err) throw err;
    else console.log('DB SYNC OK');
  });
});
