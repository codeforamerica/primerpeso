var modelUtils = require('../lib/modelUtils.js');
var _ = require('lodash');
var OptionsList = require('../../lib/OptionsList');

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  var choicesList = new OptionsList();
  var classMethods = {};
  var instanceMethods = {};

  classMethods = _.extend(modelUtils.classMethods, {
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
          validate: {
          }
        },
        link: {
          type: DataTypes.TEXT,
          label:'Links',
          widget: 'textArea',
        },
        cost: {
          type: DataTypes.INTEGER,
          label: 'Cost',
          widget: 'text'
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
