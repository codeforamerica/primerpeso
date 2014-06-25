var modelUtils = require('./lib/modelUtils.js');
var _ = require('lodash');
var choicesList = require('../lib/options');

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
      validate: {
      }
    },
    // TODO: Change to choices selection. Add 'other' field
    purpose: {
      type: DataTypes.TEXT,
      allowNull: false,
      widget: 'textArea',
      validate: {
      },
      label: 'Purpose'
    },
    // TODO: Remove later - Not used
    // canBeReappliedFor: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    //   widget: 'select',
    //   allowNull: false,
    //   label: 'Can Be Reapplied For',
    //   choices: { 0: 'No', 1:'Yes' }
    // },
    // TODO: Add 'other' field and need options for distinct municipalities
    // TODO: Are we using zipcode's for this? Consider possibility
    eligibleBusinessLocation: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      multiple: true,
      widget: 'checkbox',
      choices: choicesList.eligibleBusinessLocation,
      label: 'Eligible Business Location'
    },
    // TODO: Remove later - Not used
    // disqualifyingFactors: {
    //   type: DataTypes.ARRAY(DataTypes.TEXT),
    //   allowNull: false,
    //   multiple: true,
    //   widget: 'textArea',
    //   label: 'Disqualifying Factors'
    // },
    // Note: These need to be separate inputs on the UI that get joined
    // in the backend.
    paperworkRequired: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      widget: 'textArea',
      label: 'Paperwork Required',
      multiple: true,
      allowNull: false,
    },
    applicationCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      label: 'Application Cost',
      widget: 'text',
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
    // TODO: Add 'other' field
    benefitType: {
      type: DataTypes.STRING,
      allowNull: false,
      widget: 'select',
      choices: choicesList.benefitType,
      label: 'Benefit Type'
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
    // TODO: Change it to options widget. Options are in options.js
    minimumYearsInBusiness: {
      type: DataTypes.INTEGER,
      allowNull: false,
      label: 'Minimum Years In Business',
      widget: 'text',
    },
    eligibleEntityTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      widget: 'checkbox',
      allowNull: false,
      multiple: true,
      choices: choicesList.eligibleEntityTypes,
      label: 'Eligible Entity Types'
    },
    currentEmployeesRequired: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      widget: 'multiSelect',
      multiple: true,
      allowNull: false,
      choices: choicesList.currentEmployeesRequired,
      label: 'Current Employees Required',
    },
    annualRevenue: {
      type: DataTypes.STRING,
      widget: 'multiSelect',
      choices: choicesList.annualRevenue,
      multiple: true,
      allowNull: false,
      label: 'Annual Revenue',
    },
    // TODO: Need to add eligibleIndustries - other
    eligibleIndustries: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      multiple: true,
      allowNull: false,
      widget: 'multiSelect',
      choices: choicesList.eligibleIndustries,
      label: 'Eligible Industries',
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      label: 'Gender',
      widget: 'radio',
      choices: { any: 'Any', male: 'Male', female: 'Female', other: 'Other'}
    },
    // TODO: Make options field. Options in options.js
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      label: 'Age'
    },
    additionalDemographics:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      widget: 'checkbox',
      label: 'Additional Demographics',
      choices: { any: 'any', student: 'student', veteran: 'veteran', minority: 'minority' }
    }
    // TODO: Add additionalGeneralInformation textArea
    // TODO: Add investingOwnMoney boolean field
    // TODO: Add moneyInvested text field for whene investingOwnMoney field is true
 }

  classMethods = _.extend(modelUtils.classMethods, {});
  instanceMethods = _.extend(modelUtils.instanceMethods, {});

  return sequelize.define('opportunity', attributes, {
    classMethods: classMethods,
    instanceMethods: instanceMethods
  });
}
