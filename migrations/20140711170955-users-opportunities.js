var _ = require('lodash');
var Sequelize = require('sequelize');
var Promise = Sequelize.Promise;

module.exports = {
  up: function(migration, DataTypes, done) {
    // Some set up.
    var User = migration.migrator.sequelize.model('user');
    var Opportunity = migration.migrator.sequelize.model('opportunity');
    // Give higher scope to user object.
    var defaultCreator;

    migration.addColumn( 'opportunities', 'creatorId', {
        type: DataTypes.INTEGER
      }
    ).then(function() {
      return User.find({ where: { email: 'clara@codeforamerica.org' } });
    }).then(function(user) {
      defaultCreator = user;
      return Opportunity.all();
    }).then(function(result) {
      var promiseContainer = [];
      _.each(result, function(opportunity, opportunityIndex) {
        promiseContainer.push(opportunity.setCreator(defaultCreator));
      });
      return Promise.all(promiseContainer);
    }).then(function() {
      return done();
    }).error(function(err) {
      throw err;
    });
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
