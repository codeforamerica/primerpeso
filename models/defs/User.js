var modelUtils = require('../lib/modelUtils.js');
var _ = require('lodash');
var S = require('string');
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

  // TODO -- write me in the same pattern as the other model defs.
  classMethods = _.extend(modelUtils.classMethods, {
    createInstance: function(body) {
      console.log(body);
      if (body.password !== body.confirmPassword)
        throw new Error('Confirm password does not match.');

      return this.create({
        email: body.email,
        password: body.password
      });
    }
  });
  instanceMethods = _.extend(modelUtils.instanceMethods, {
    comparePassword: function(candidatePassword, fn) {
      var isMatch = bcrypt.compareSync(candidatePassword, this.password);
      fn(null, isMatch);
    },
  });
  hooks = _.extend(modelUtils.hooks, {
    beforeCreate: function(user, cb) {
      // TODO - implement updating passes.
      var salt = bcrypt.genSaltSync(5);
      var hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
      cb(null, user);
    },
  });

  return sequelize.define('user', attributes, {
    classMethods: classMethods,
    instanceMethods: instanceMethods,
    hooks: hooks
  });
}
