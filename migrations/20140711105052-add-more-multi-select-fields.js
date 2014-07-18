var OptionsList = require('../lib/OptionsList');
var choicesList = new OptionsList;

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn(
      'opportunities',
      'purposeTemp',
      {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        widget: 'multiSelect',
        choices: choicesList.getFormChoices('purpose'),
        validate: {
        },
        label: 'Purpose',
        defaultValue: ['anything'],
        choiceOther: true
      }
    );
    migration.addColumn(
      'opportunities',
      'ageTemp',
      {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        label: 'Age',
        widget: 'multiSelect',
        defaultValue: [0],
        choices: choicesList.getFormChoices('age'),
      }
    );
    migration.addColumn(
      'opportunities',
      'benefitTypeTemp',
      {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        widget: 'multiSelect',
        choices: choicesList.getFormChoices('benefitType'),
        label: 'Benefit Type',
        defaultValue: ['incentive'],
        choiceOther: true
      }
    );
    var Model = migration.migrator.sequelize.model('opportunity');
    Model.all().success(function(result) {
      for (var i = 0; i < result.length; i++) {
        result[i].purposeTemp = [result[i].purpose];
        result[i].ageTemp = [result[i].age];
        result[i].benefitTypeTemp = [result[i].benefitType];
        result[i].save().success(function(savedResult) {
          if (savedResult.id === result[result.length - 1].id) {
            migration.removeColumn('opportunities', 'purpose');
            migration.removeColumn('opportunities', 'age');
            migration.removeColumn('opportunities', 'benefitType');
            migration.renameColumn('opportunities', 'purposeTemp', 'purpose');
            migration.renameColumn('opportunities', 'ageTemp', 'age');
            migration.renameColumn('opportunities', 'benefitTypeTemp', 'benefitType');
          };
        });
      };
    });
    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
