module.exports = {
  up: function(migration, DataTypes, done) {
    var User = migration.migrator.sequelize.model('user');
    var Opportunity = migration.migrator.sequelize.model('opportunity');
    User.hasMany(Opportunity);
    migration.migrator.sequelize.sync({ force: false }).complete(function(err) {
      if (err) throw err;
      console.log('Association done.');
    });
    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
