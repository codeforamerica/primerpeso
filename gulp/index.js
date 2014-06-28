var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

if (process.env.NODE_ENV == 'production') {
  require('./tasks/prodBuild');
}
else {
  tasks.forEach(function(task) {
    require('./tasks/' + task);
  });
}
