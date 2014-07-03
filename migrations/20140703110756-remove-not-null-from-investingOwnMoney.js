module.exports = {
  up: function(migration, DataTypes, done) {
    migration.changeColumn(
      'opportunities',
      'investingOwnMoney',
      {
        type: DataTypes.STRING,
        widget: 'radio',
        choices: {'yes': 'yes', 'yes': 'no'},
        label: 'Is there any amount the business needs to invest?'
      }
    );
    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
