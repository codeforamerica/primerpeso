module.exports = {
  up: function(migration, DataTypes, done) {
    migration.changeColumn(
      'opportunities',
      'additionalGeneralInformation',
      {
        type: DataTypes.TEXT,
        widget: 'textArea',
        label: 'Additional General Information'
      }
    );
    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
