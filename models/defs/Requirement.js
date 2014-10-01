var modelUtils = require('../lib/modelUtils.js');
var _ = require('lodash');
var OptionsList = require('../../lib/OptionsList');

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  var choicesList = new OptionsList();
  var classMethods = {};
  var instanceMethods = {};

  classMethods = _.extend(modelUtils.classMethods, {
    // TODO -- this comes from model utils and doesnt need to be here once the caching of indexjs is gone.
    loadFull: function(options, queryOptions) {
      return this.find(options, queryOptions);
    },
    getListFields: function() {
      return {
        'name': 'Requirement Name',
      };
    },
    _getAttributes: function() {
      return {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          label:'Nombre del Requisito',
          unique: true,
          validate: {}
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
          label:'Provedor',
          validate: {}
        },
        reqProvider: {
          type: DataTypes.STRING,
          allowNull: true,
          label:'Provedor',
          validate: {}
        },
        link: {
          type: DataTypes.TEXT,
          label:'Links',
          widget: 'textArea',
        },
        cost: {
          type: DataTypes.TEXT,
          label: 'Cost',
          widget: 'textArea'
        },
        // Association
        creatorId: {
          type: DataTypes.INTEGER,
        }
      }
    }
  });
  instanceMethods = _.extend(modelUtils.instanceMethods, {});

  return sequelize.define('requirement',
    classMethods.buildAttributes(true), {
    classMethods: classMethods,
    instanceMethods: instanceMethods
  });
}
