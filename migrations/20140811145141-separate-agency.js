var _ = require('lodash');
var Sequelize = require('sequelize');
var Promise = Sequelize.Promise;

module.exports = {
  up: function(migration, DataTypes, done) {
    var sequelize = migration.migrator.sequelize;
    // add altering commands here, calling 'done' when finished
    var Opportunity = sequelize.model('opportunity');
    var User = sequelize.model('user');
    var Agency = sequelize.model('agency');
    var defaultCreator;

    migration.addColumn( 'opportunities', 'agencyId', {
      type: DataTypes.INTEGER
    }).then(function() {
      return User.find({ where: { email: 'clara@codeforamerica.org' } });
    }).then(function(user) {
      // Set user.
      defaultCreator = user;
      // Get a "pivot table" of all the agencies in opportunities ATM.
      var sql = 'SELECT DISTINCT "agencyName" FROM "opportunities"';
      return sequelize.query(sql,  Opportunity, { raw: true });
    }).then(function(agencies) {
      var promiseContainer = [];
      _.each(agencies, function(agencyObject, index) {
        promiseContainer.push(Agency.create({
          name: agencyObject.agencyName,
          creatorId: defaultCreator.id
        }));
      });
      return Promise.all(promiseContainer);
    }).then(function(createdAgencies) {
      var promiseContainer = [];
      _.each(createdAgencies, function(createdAgency, createdAgencyIndex) {
        var name = createdAgency.get('name');
        var id = createdAgency.get('id');
        // Set agencyId where agencyName matches.
        promiseContainer.push(
          Opportunity.update({ agencyId: id }, { agencyName: name })
        );
      });
      return Promise.all(promiseContainer);
    }).then(function(updatedOps) {
      migration.removeColumn('opportunities', 'agencyName');
    }).then(function() {
      return done();
    });
},
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
