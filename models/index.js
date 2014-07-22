var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , _         = require('lodash')
  , S         = require('string')
  , secrets   = require('../config/secrets')
  , dirname   = __dirname + '/defs'
  , modelNames = [];

  var sequelize = new Sequelize(secrets.pg, {
    dialect: 'postgres',
    sync: { force: false },
    language: 'en'
  });

fs
  .readdirSync(dirname)
  .filter(function(file) {
    return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'))
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(dirname, file));
    modelNames.push(model.name);
  })

_.each(modelNames, function(modelName) {
  var Model = sequelize.model(modelName);
  Model.associate(sequelize);
})

module.exports = { sequelize: sequelize };
