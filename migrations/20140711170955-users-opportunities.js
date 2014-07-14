module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn(
      'opportunities',
      'user_id',
      {
        type: DataTypes.INTEGER,
      }
    );
    var Model = migration.migrator.sequelize.model('opportunity');
    Model.all().success(function(result) {
      for (var i = 0; i < result.length; i++) {
        result[i]['user_id'] = 1;
        result[i].save()
      }
    });
    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
