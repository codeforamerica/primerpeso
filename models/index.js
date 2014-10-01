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
    language: 'en',
    logging: false
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

// Run associate here:
var User = sequelize.model('user');
var Opportunity = sequelize.model('opportunity');
var Agency = sequelize.model('agency');
var Requirement = sequelize.model('requirement');

/***** Agency *****/
// Agency refs user as creator
Agency.belongsTo(User, { as: 'creator' });

/***** Opportunity *****/
// Opportunity refs User as creator.
Opportunity.belongsTo(User, { as: 'creator' });
// Opportunity refs Agency as agency.
Opportunity.belongsTo(Agency, { as: 'agency'});
// Opportunity has Many requirements.
Opportunity.hasMany(Requirement);

/***** Requirement *****/
Requirement.belongsTo(User, { as: 'creator' });
Requirement.hasMany(Opportunity);

/***** User *****/
// User has many Opportunities through the creatorId fk.
User.hasMany(Opportunity, { foreignKey: 'creatorId' });
// User has many Agencies through the creatorId fk.
User.hasMany(Agency, { foreignKey: 'creatorId' });
// User has many Requirements through the creatorId fk.
User.hasMany(Requirement, { foreignKey: 'creatorId' });

// TODO -- this needs to be rewritten not to follow the caching pattern.




module.exports = { sequelize: sequelize };
