// Paths always relative to root.
var tasksToRoot = './';
var nm = './node_modules';
var publicPath = tasksToRoot + 'public';
var src = publicPath + '/src';
var dest = publicPath + '/build';

var config = {
  publicPath: publicPath,
  src: src,
  dest: dest,
  port: '3737',
  // Stuff that's not already in /lib
  vendorJS: [
    nm + '/jquery/dist/jquery.js',
    nm + '/lodash/dist/lodash.js',
    nm + '/bootstrap/dist/js/bootstrap.js',
    src + '/js/lib/**'
    //nm + '/moment/moment.js'
    //nm + '/swiftclick/js/libs/swiftclick.js',
  ],
  vendorCSS: [
  ]
}


exports = module.exports = config;

