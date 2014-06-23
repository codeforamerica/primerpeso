var modelUtils = require('./lib/modelUtils.js');
var _ = require('lodash');

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  var classMethods = {};
  var instanceMethods = {};
  attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    title:  {
      type: DataTypes.STRING,
      allowNull: false,
      label:'Program Title',
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
      widget: 'textArea',
      label: 'Purpose'
    }
  };

  classMethods = _.extend(modelUtils.classMethods, {});
  instanceMethods = _.extend(modelUtils.instanceMethods, {});

  return sequelize.define('Opportunity', attributes, {
    classMethods: classMethods,
    instanceMethods: instanceMethods
  });
}
