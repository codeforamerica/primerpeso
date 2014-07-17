var modelUtils = require('../lib/modelUtils.js');
var _ = require('lodash');
var choicesList = require('../../lib/options');

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  var classMethods = {};
  var instanceMethods = {};
  attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    title:  {
      type: DataTypes.STRING,
      allowNull: false,
      label:'Program Title',
      unique: true,
      validate: {
      }
    },
    purpose: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
      widget: 'multiSelect',
      choices: choicesList.getFormChoices('purpose'),
      validate: {
      },
      label: 'Purpose of Program',
      choiceOther: true,
      multiple: true
    },
    // TODO: Need to add distinct municipalities to options
    eligibleBusinessLocation: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      multiple: true,
      widget: 'select',
      choices: choicesList.getFormChoices('eligibleBusinessLocation'),
      label: 'Eligible Business Location',
      choiceOther: true
    },
    // TODO: These need to be separate inputs on the UI that get joined
    // in the backend.
    paperworkRequired: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      widget: 'arrayTextField',
      label: 'Paperwork Required',
      multiple: true,
      allowNull: false
    },
    applicationCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      label: 'Application Cost',
      widget: 'text',
      validate: {
        isNumeric: true
      }
    },
    applicationDeadline: {
      type: DataTypes.DATE,
      allowNull: false,
      widget: 'date',
      label: 'Application Deadline'
    },
    avgApplicationTime: {
      type: DataTypes.STRING,
      allowNull: false,
      widget: 'text',
      label: 'Average Application Time'
    },
    // TODO -- abstract choices to freaking callbacks.
    benefitType: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      widget: 'multiSelect',
      choices: choicesList.getFormChoices('benefitType'),
      label: 'Benefit Type',
      choiceOther: true,
      multiple: true
    },
    benefitDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      widget: 'textArea',
      label: 'Benefit Description',
    },
    agencyName: {
      type: DataTypes.STRING,
      label: 'Agency Name',
      allowNull: false,
      widget: 'text',
    },
    agencyContactName: {
      type: DataTypes.STRING,
      label: 'Agency Contact Name',
      allowNull: false,
      widget: 'text',
    },
    agencyContactEmail: {
      type: DataTypes.STRING,
      label: 'Agency Contact Email',
      allowNull: false,
      widget: 'text',
    },
    agencyContactPhone: {
      type: DataTypes.STRING,
      label: 'Agency Contact Phone',
      allowNull: false,
      widget: 'text',
    },
    minimumYearsInBusiness: {
      type: DataTypes.INTEGER,
      allowNull: false,
      label: 'Minimum Years In Business',
      widget: 'select',
      choices: choicesList.getFormChoices('yearsInBusiness'),
    },
    eligibleEntityTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      widget: 'checkbox',
      allowNull: false,
      multiple: true,
      choices: choicesList.getFormChoices('eligibleEntityTypes'),
      label: 'Eligible Entity Types'
    },
    currentEmployeesRequired: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      widget: 'multiSelect',
      multiple: true,
      allowNull: false,
      choices: choicesList.getFormChoices('currentEmployeesRequired'),
      label: 'Current Employees Required',
    },
    annualRevenue: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      widget: 'multiSelect',
      choices: choicesList.getFormChoices('annualRevenue'),
      multiple: true,
      allowNull: false,
      label: 'Annual Revenue',
    },
    eligibleIndustries: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      multiple: true,
      allowNull: false,
      widget: 'multiSelect',
      choices: choicesList.getFormChoices('eligibleIndustries'),
      label: 'Eligible Industries',
      choiceOther: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      label: 'Gender',
      widget: 'select',
      choices: choicesList.getFormChoices('gender')
    },
    age: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      label: 'Age',
      widget: 'multiSelect',
      choices: choicesList.getFormChoices('age'),
      multiple: true
    },
    additionalDemographics: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      widget: 'checkbox',
      label: 'Additional Demographics',
      choices: { any: 'any', student: 'student', veteran: 'veteran', minority: 'minority' },
      multiple: true
    },
    additionalGeneralInformation: {
      type: DataTypes.TEXT,
      widget: 'textArea',
      label: 'Additional General Information'
    },
    investingOwnMoney: {
      type: DataTypes.STRING,
      widget: 'radio',
      choices: {true: 'yes', false: 'no'},
      label: 'Is there any amount the business needs to invest?'
    },
    moneyInvested: {
      type: DataTypes.STRING,
      widget: 'text',
      label: 'How much?'
    },
    user_id: {
      type: DataTypes.INTEGER
    }
 }

  classMethods = _.extend(modelUtils.classMethods, {
    getListFields: function() {
      /*return [
        'title',
        'purpose'
      ];*/
      return null;
    }
  });
  instanceMethods = _.extend(modelUtils.instanceMethods, {});

  return sequelize.define('opportunity', attributes, {
    classMethods: classMethods,
    instanceMethods: instanceMethods
  });
}
