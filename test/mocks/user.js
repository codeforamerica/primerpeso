var _ = require('lodash');

exports = module.exports = function(overrides) {
  var overrides = overrides || {};
  var body = {
    "_csrf": "undefined",
    "_doc_id": "",
    "email": "clara@example.com",
    "password": "somecrazyHASHEDpassword",
    "firstName": "Coqui",
    "lastName": "Clara",
  }

  return _.extend(body, overrides);
}