var modelUtils = require('../lib/modelUtils.js');
var _ = require('lodash');
var OptionsList = require('../../lib/OptionsList');

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  var choicesList = new OptionsList();
  var classMethods = {};
  var instanceMethods = {};
  attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      label:'Nombre de la Agencia',
      unique: true,
      validate: {
      }
    },
    mission: {
      type: DataTypes.TEXT,
      label:'Misión de la Agencia',
      widget: 'textArea',
    },
    phone: {
      type: DataTypes.STRING,
      label: 'Número de teléfono',
      widget: 'tel'
    },
    fax: {
      type: DataTypes.STRING,
      label: 'Número de fax',
      widget: 'tel'
    },
    email: {
      type: DataTypes.STRING,
      label: 'Correo electrónico',
      widget: 'email'
    },
    address: {
      type: DataTypes.STRING,
      label: 'Dirección postal',
      widget: 'text'
    },
    municipality: {
      type: DataTypes.STRING,
      label: 'Municipio / Ciudad',
      widget: 'text',
    },
    state: {
      type: DataTypes.STRING,
      label: 'Estado',
      widget: 'select',
      choices: choicesList.getFormChoices('statesList'),
    },
    zip: {
      type: DataTypes.STRING,
      label: 'Código Postal',
      widget: 'text'
    },
    web: {
      type: DataTypes.STRING,
      label: 'Sitio Web',
      widget: 'url'
    },
    // Association
    creatorId: {
      type: DataTypes.INTEGER,
    }
  }

  classMethods = _.extend(modelUtils.classMethods, {
    getListFields: function() {
      return {
        'name': 'Agency Name',
      };
    },
    associate: function(sequelize) {
      var User = sequelize.model('user');
      var Opportunity = sequelize.model('user');
      this.belongsTo(User, { as: 'creator' });
    }
  });
  instanceMethods = _.extend(modelUtils.instanceMethods, {});

  return sequelize.define('agency', attributes, {
    classMethods: classMethods,
    instanceMethods: instanceMethods
  });
}
