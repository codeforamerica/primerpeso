var _ = require('lodash');

exports = module.exports = function(overrides) {
  var overrides = overrides || {};
  var body = {
    "_csrf": "undefined",
    "_doc_id": "",
    "name": "My Awesome Agency"
  }

  return _.extend(body, overrides);
}
