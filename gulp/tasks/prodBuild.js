var gulp = require('gulp');
var browserify = require('./browserify');
var vendor = require('./vendor');
var less = require('./less');
var images = require('./images');
var copy = require('./copy');
gulp.task('prodBuild', ['browserify', 'vendor', 'less', 'images', 'copy']);
