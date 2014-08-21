var modelUtils = require('../lib/modelUtils.js');
var _ = require('lodash');
var OptionsList = require('../../lib/OptionsList');

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  var choicesList = new OptionsList();
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
      label:'Nombre del Programa',
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
      label: 'Propósito del Programa',
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
      label: 'Ubicación del negocio elegible',
      choiceOther: true
    },
    // TODO: These need to be separate inputs on the UI that get joined
    // in the backend.
    paperworkRequired: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      widget: 'arrayTextField',
      label: 'Documentación requerida',
      multiple: true,
      allowNull: false
    },
    applicationCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      label: 'Costo de la aplicación',
      widget: 'text',
      validate: {
        isNumeric: true
      }
    },
    applicationDeadline: {
      type: DataTypes.DATE,
      allowNull: false,
      widget: 'date',
      label: 'Fecha de expiración'
    },
    avgApplicationTime: {
      type: DataTypes.STRING,
      allowNull: false,
      widget: 'text',
      label: 'Tiempo estimado (desde ___ hasta ___)'
    },
    // TODO -- abstract choices to freaking callbacks.
    benefitType: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      widget: 'multiSelect',
      choices: choicesList.getFormChoices('benefitType'),
      label: 'Tipo de Beneficio',
      choiceOther: true,
      multiple: true
    },
    benefitDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      widget: 'textArea',
      label: 'Descripción de Beneficio',
    },
    agencyName: {
      type: DataTypes.STRING,
      label: 'Nombre de Agencia',
      allowNull: false,
      widget: 'text',
    },
    agencyContactName: {
      type: DataTypes.STRING,
      label: 'Nombre de contacto en Agencia',
      allowNull: false,
      widget: 'text',
    },
    agencyContactEmail: {
      type: DataTypes.STRING,
      label: 'Email de contacto',
      allowNull: false,
      widget: 'text',
    },
    agencyContactPhone: {
      type: DataTypes.STRING,
      label: 'Teléfono de contacto en Agencia',
      allowNull: false,
      widget: 'text',
    },
    minimumYearsInBusiness: {
      type: DataTypes.INTEGER,
      allowNull: false,
      label: 'Mínimo de años en Negocio',
      widget: 'select',
      choices: choicesList.getFormChoices('yearsInBusiness'),
    },
    eligibleEntityTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      widget: 'checkbox',
      allowNull: false,
      multiple: true,
      choices: choicesList.getFormChoices('eligibleEntityTypes'),
      label: 'Tipo de entidades elegibles'
    },
    currentEmployeesRequired: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      widget: 'multiSelect',
      multiple: true,
      allowNull: false,
      choices: choicesList.getFormChoices('currentEmployeesRequired'),
      label: 'Número de empleados requeridos',
    },
    annualRevenue: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      widget: 'multiSelect',
      choices: choicesList.getFormChoices('annualRevenue'),
      multiple: true,
      allowNull: false,
      label: 'Ganancia anual requerida',
    },
    eligibleIndustries: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      multiple: true,
      allowNull: false,
      widget: 'multiSelect',
      choices: choicesList.getFormChoices('eligibleIndustries'),
      label: 'Industrias elegibles',
      choiceOther: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      label: 'Género',
      widget: 'select',
      choices: choicesList.getFormChoices('gender')
    },
    age: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      label: 'Edad',
      widget: 'multiSelect',
      choices: choicesList.getFormChoices('age'),
      multiple: true
    },
    additionalDemographics: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      widget: 'checkbox',
      label: 'Otros',
      choices: { any: 'cualquiera', student: 'estudiante', veteran: 'veterano', minority: 'minoría' },
      multiple: true
    },
    additionalGeneralInformation: {
      type: DataTypes.TEXT,
      widget: 'textArea',
      label: 'Información general adicional'
    },
    investingOwnMoney: {
      type: DataTypes.STRING,
      widget: 'radio',
      choices: {true: 'yes', false: 'no'},
      label: '¿Hay algún monto que el empresario deba invertir?'
    },
    moneyInvested: {
      type: DataTypes.STRING,
      widget: 'text',
      label: '¿Cuanto debería invertir?'
    },
    // Association
    creatorId: {
      type: DataTypes.INTEGER,
    }
  }

  classMethods = _.extend(modelUtils.classMethods, {
    getListFields: function() {
      return {
        'title': 'Título',
        'applicationDeadline': 'Vencimiento de la Aplicación',
        'benefitType': 'Tipo de beneficio',
        'agencyContactName': 'Contacto de la agencia',
      };
    },
    associate: function(sequelize) {
      var User = sequelize.model('user');
      this.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });
    }
  });
  instanceMethods = _.extend(modelUtils.instanceMethods, {});

  return sequelize.define('opportunity', attributes, {
    classMethods: classMethods,
    instanceMethods: instanceMethods
  });
}
