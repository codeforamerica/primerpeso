module.exports = {
  up: function(migration, DataTypes, done) {
    migration.changeColumn(
      'opportunities',
      'additionalGeneralInformation',
      {
        type: DataTypes.STRING(4056),
        widget: 'textArea',
        label: 'Additional General Information'
      }
    );
    done()
  },
  down: function(migration, DataTypes, done) {
    migration.changeColumn(
      'opportunities',
      'additionalGeneralInformation',
      {
        type: DataTypes.STRING,
        widget: 'textArea',
        label: 'Additional General Information'
      }
    );
    done()
  }
}
