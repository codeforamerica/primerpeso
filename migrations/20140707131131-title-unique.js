module.exports = {
  up: function(migration, DataTypes, done) {
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
