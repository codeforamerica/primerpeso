var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , _         = require('lodash')
  , S         = require('string')
  , secrets   = require('../config/secrets')
  , dirname   = __dirname + '/defs'
  , db        = {}
  , methods   = {};

  var sequelize = new Sequelize(secrets.pg, {
    dialect: 'postgres',
    sync: { force: true },
    language: 'en'
  });

fs
  .readdirSync(dirname)
  .filter(function(file) {
    return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'))
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(dirname, file));
    db[model.name] = model;
  })

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db)
  }
})

module.exports = { sequelize: sequelize };
