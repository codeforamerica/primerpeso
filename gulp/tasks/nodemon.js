var gulp = require('gulp');
var gnodemon = require('gulp-nodemon');
var config = require('../config');

gulp.task('nodemon', function() {
  gnodemon({
    script: "server.js",
    env: { 'PORT': config.port },
    ignore: [
      "gulp/*",
      "Gulpfile.js",
      "package.json",
      "node_modules/*",
      "client/*",
      ".git/*"
    ]
  });
});
