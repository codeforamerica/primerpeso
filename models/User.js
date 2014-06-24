var modelUtils = require('./lib/modelUtils.js');
var _ = require('lodash');
var S = require('string');
var choicesList = require('../lib/options');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

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
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    //tokens: Array,
    //resetPasswordToken: String,
    //resetPasswordExpires: Date
  };

  classMethods = _.extend(modelUtils.classMethods, {});
  instanceMethods = _.extend(modelUtils.instanceMethods, {
    comparePassword: function(candidatePassword, fn) {
      bcrypt.compare(candidatePassword,
      this.password,
      function(err, isMatch) {
          if (err) return cb(err);
          cb(null, isMatch);
      });
    },
  });
  hooks = _.extend(modelUtils.hooks, {
    beforeUpdate: function(user, cb) {
      console.log('pre update');
      bcrypt.genSalt(5, function(err, salt) {
        if (err) return cb(err);
        bcrypt.hash(value, salt, null, function(err, hash) {
          if (err) return cb(err);
            user.password = hash;
            return cb(null, user);
        });
      });
    },
  });

  return sequelize.define('User', attributes, {
    classMethods: classMethods,
    instanceMethods: instanceMethods,
    hooks: hooks
  });
}
