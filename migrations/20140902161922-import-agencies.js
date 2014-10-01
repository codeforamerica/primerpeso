var _ = require('lodash');
var Sequelize = require('sequelize');
var Promise = Sequelize.Promise;
var CSV = require('comma-separated-values');
var fs = require('fs');
Promise.promisifyAll(fs);

module.exports = {
  up: function(migration, DataTypes, done) {
    var sequelize = migration.migrator.sequelize;
    // add altering commands here, calling 'done' when finished
    var Opportunity = sequelize.model('opportunity');
    var User = sequelize.model('user');
    var Agency = sequelize.model('agency');
    var defaultCreator;

    Agency.findAndCountAll().then(function(result) {
      if (result.count > 100) {
	// Hack -- prevent migrations from running if already done.
	return done();
      }
      else {
	User.find({ where: { email: 'clara@codeforamerica.org' } }).then(function(user) {
	  // Set user.
	  defaultCreator = user;
	  return fs.readFileAsync(__dirname + '/../data_import/agencies.csv', { encoding: 'utf8' });
	}).then(function(data) {
	  var parsedData = new CSV(data, {
	    header: ['name', 'mission', 'address', 'municipality', 'zip', 'phone', 'fax', 'web']
	  }).parse();
	  parsedData = _.map(parsedData, function(agencyData) {
	    return _.extend(agencyData, { creatorId: defaultCreator.id });
	  });
	  var agencyPromises = [];
	  _.each(parsedData, function(agencyData, index) {
	    agencyPromises.push(Agency.create(agencyData));
	  });
	  return Promise.all(agencyPromises);
	}).success(function() {
	  console.log('AGENCY DONE');
	  return done();
	}).error(function(err) {
	  return done(err)
	});
      }
    });
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
