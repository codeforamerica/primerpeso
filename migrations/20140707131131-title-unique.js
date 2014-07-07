module.exports = {
  up: function(migration, DataTypes, done) {
    var query = "DELETE FROM opportunities WHERE id IN (SELECT id FROM (SELECT id, row_number() over (partition BY title ORDER BY id) AS rnum FROM opportunities) t WHERE t.rnum > 1);";
    migration.migrator.sequelize.query(query).success(function(){
      migration.changeColumn(
        'opportunities',
        'title',
        {
          type: DataTypes.STRING,
          allowNull: false,
          label:'Program Title',
          unique: true
        }
      );
      done()
    });
  },
  down: function(migration, DataTypes, done) {
    migration.changeColumn(
      'opportunities',
      'title',
      {
        type: DataTypes.STRING,
        allowNull: false,
        label:'Program Title',
        unique: false
      }
    );
    done()
  }
}
