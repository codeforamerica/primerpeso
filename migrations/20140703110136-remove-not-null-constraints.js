module.exports = {
  up: function(migration, DataTypes, done) {
    migration.changeColumn(
      'opportunities',
      'moneyInvested',
      {
        type: DataTypes.STRING,
        widget: 'text',
        label: 'How much?'
      }
    );
    migration.changeColumn(
      'opportunities',
      'additionalDemographics',
      {
        type: DataTypes.ARRAY(DataTypes.STRING),
        widget: 'checkbox',
        label: 'Additional Demographics',
        choices: { any: 'any', student: 'student', veteran: 'veteran', minority: 'minority' },
        multiple: true
      }
    );
    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
