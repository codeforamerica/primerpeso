
var loremIpsum = require('lorem-ipsum');

exports.munchOppRequest = function(req, res, next) {
  console.log(req.body);
  req.body.name = loremIpsum({
    count: 2,
    units: 'words',
    format: 'plain'
  });

  req.body.description = loremIpsum({
    count: 3,
    units: 'sentences',
    format: 'plain'
  });
  next();

}

