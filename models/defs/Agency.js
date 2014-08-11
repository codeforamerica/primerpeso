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
      label:'Agency Name',
      unique: true,
      validate: {
      }
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
      this.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });
    }
  });
  instanceMethods = _.extend(modelUtils.instanceMethods, {});

  return sequelize.define('agency', attributes, {
    classMethods: classMethods,
    instanceMethods: instanceMethods
  });
}
