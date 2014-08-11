var _ = require('lodash');
var Sequelize = require('sequelize');
var Promise = Sequelize.Promise;

module.exports = {
  up: function(migration, DataTypes, done) {
    var sequelize = migration.migrator.sequelize;
    // add altering commands here, calling 'done' when finished
    var Opportunity = sequelize.model('opportunity');

    migration.addColumn( 'opportunities', 'agencyId', {
      type: DataTypes.INTEGER
    }).then(function() {
      // Get a "pivot table" of all the agencies in opportunities ATM.
      var sql = 'SELECT DISTINCT "agencyName" FROM "opportunities"',
      return sequelize.query(sql,  Opportunity, { raw: true });
    }).then(function(agencies) {
      console.log(agencies);
    });
    done();
},
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
