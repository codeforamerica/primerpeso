var _ = require('lodash');
var path = require('path');
var db = require('../models');
var sequelize = db.sequelize;
var S = require('string');
var url = require('url');
var Promise = require('bluebird');

module.exports = function(app) {

  var baseAPI = '/api';


  // TODO -- need these in a separate file.
  app.get(path.join(baseAPI, '/:model'), apiGetModelList);
  app.get(path.join(baseAPI, '/:model/:id'), apiGetModel);


};


// API
function apiGetModelList(req, res) {
  var modelName = req.params.model || '';
  var Model = sequelize.isDefined(modelName) ? sequelize.model(modelName) : null;
  // Only lock down to id based query params.
  searchQuery = {};
  if (req.query.orderby)
    searchQuery.order = [req.query.orderby];
  if (req.query && req.query.id) {
    var idIN = req.query.id.split(',');
    searchQuery.where = { id: { in: idIN } };
  }
  Model.findAll(searchQuery).success(function(result) {
    // TODO -- this should be at a model level and is a hack.
    if (modelName === 'submission') {
      result = _.map(result, function(element) { return scrubResult(element); });
    }
    if (req.query.separateby)
      result = _.groupBy(result, function(element, index) { return element[req.query.separateby]; });
    return res.json(result);
  });
}

function apiGetModel(req, res) {
  var modelName = req.params.model || '';
  var Model = sequelize.isDefined(modelName) ? sequelize.model(modelName) : null;
  var id = req.params.id;
  if (!Model || S(id).isNumeric() === false)
    return res.status(404).send('Not Found');

  Model.loadFull({ where: { id: id } }).success(function(result) {
    return res.json(scrubResult(result));
  });
}


function scrubResult(result)  {
  return _.omit(result.toJSON(), ['name', 'phone', 'email', 'address', 'legalCompanyName']);
}
