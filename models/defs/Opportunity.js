var modelUtils = require('../lib/modelUtils.js');
var _ = require('lodash');
var OptionsList = require('../../lib/OptionsList');

module.exports = function(sequelize, DataTypes) {
  var choicesList = new OptionsList();
  var classMethods = {};
  var instanceMethods = {};
  var hooks = {};
  var defaultScope = {};
  var scopes = {};

  classMethods = _.extend(modelUtils.classMethods, {
    loadFull: function(options, queryOptions) {
      var findOptions = _.extend(options, {
        include: [
          { model: sequelize.model('agency'), as: 'agency' },
          { model: sequelize.model('requirement'), as: 'requirements' }
        ]
      });
      var findQueryOptions = _.extend(queryOptions, {});
      return this.find(findOptions, findQueryOptions);
    },
    // TODO -- add this to modelUtils and DRY UP.
    findAllFull: function(options, queryOptions) {
      var findOptions = _.extend(options, {
        include: [
          { model: sequelize.model('agency'), as: 'agency' },
          { model: sequelize.model('requirement'), as: 'requirements' }
        ]
      });
      var findQueryOptions = _.extend(queryOptions, {});
      return this.findAll(findOptions, findQueryOptions);
    },
    getListFields: function() {
      return {
        'title': 'Título',
        'applicationDeadline': 'Vencimiento del programa',
        'benefitType': 'Tipo de beneficio',
        'agencyContactName': 'Contacto de la agencia',
      };
    },
    _getAttributes: function() {
      return {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true
        },
        title:  {
          type: DataTypes.STRING,
          allownull: false,
          label:'Nombre del Programa',
          unique: true,
          validate: {
          }
        },
        purpose: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          allownull: false,
          widget: 'multiSelect',
          choices: choicesList.getFormChoices('purpose'),
          validate: {
          },
          label: 'Propósito del Programa',
          choiceOther: true,
          multiple: true
        },
        eligibleBusinessLocation: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allownull: false,
          multiple: true,
          widget: 'multiSelect',
          choices: choicesList.getFormChoices('eligibleBusinessLocation'),
          label: 'Ubicación del negocio elegible',
        },
        // TODO: These need to be separate inputs on the UI that get joined
        // in the backend.
        paperworkRequired: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          widget: 'arrayTextField',
          label: 'Documentación requerida',
          multiple: true,
          allownull: false
        },
        applicationCost: {
          type: DataTypes.INTEGER,
          allownull: false,
          label: 'Costo de la aplicación - (colocar solo número)',
          widget: 'text',
          validate: {
            isNumeric: true
          }
        },
        applicationDeadline: {
          type: DataTypes.DATE,
          allownull: false,
          widget: 'date',
          label: 'Fecha de expiración'
        },
        avgApplicationTime: {
          type: DataTypes.STRING,
          allownull: false,
          widget: 'text',
          label: 'Tiempo estimado de finalización desde  ___ hasta  ___)'
        },
        // TODO -- abstract choices to freaking callbacks.
        benefitType: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allownull: false,
          widget: 'multiSelect',
          choices: choicesList.getFormChoices('benefitType'),
          label: 'Tipo de Beneficio',
          choiceOther: true,
          multiple: true
        },
        benefitDescription: {
          type: DataTypes.TEXT,
          allownull: false,
          widget: 'textArea',
          label: 'Descripción de Beneficio',
        },
        agencyId: {
          type: DataTypes.INTEGER,
          widget: 'ref',
          refTarget: 'agency',
          label: 'Nombre de la agencia'
        },
        requirementsRef: {
          type: null, // NULL types will be excluded from the columns.
          widget: 'ref',
          refTarget: 'requirement',
          label: 'Requirements or Whatever',
          assocName: 'opportunitiesrequirements',
          multiple: true
        },
        agencyContactName: {
          type: DataTypes.STRING,
          label: 'Nombre de contacto en agencia',
          allownull: false,
          widget: 'text'
        },
        agencyContactEmail: {
          type: DataTypes.STRING,
          label: 'Email de contacto',
          allownull: false,
          widget: 'text',
        },
        agencyContactPhone: {
          type: DataTypes.STRING,
          label: 'Teléfono de contacto en agencia',
          allownull: false,
          widget: 'text',
        },
        minimumYearsInBusiness: {
          type: DataTypes.INTEGER,
          allownull: false,
          label: 'Mínimo de años en Negocio',
          widget: 'select',
          choices: choicesList.getFormChoices('yearsInBusiness'),
        },
        eligibleEntityTypes: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          widget: 'checkbox',
          allownull: false,
          multiple: true,
          choices: choicesList.getFormChoices('eligibleEntityTypes'),
          label: 'Tipo de entidades elegibles'
        },
        currentEmployeesRequired: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          widget: 'multiSelect',
          multiple: true,
          allownull: false,
          choices: choicesList.getFormChoices('currentEmployeesRequired'),
          label: 'Número de empleados requeridos',
        },
        annualRevenue: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          widget: 'multiSelect',
          choices: choicesList.getFormChoices('annualRevenue'),
          multiple: true,
          allownull: false,
          label: 'Volumen anual requerido',
        },
        eligibleIndustries: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          multiple: true,
          allownull: false,
          widget: 'multiSelect',
          choices: choicesList.getFormChoices('eligibleIndustries'),
          label: 'Industrias elegibles',
          choiceOther: true
        },
        gender: {
          type: DataTypes.STRING,
          allownull: false,
          label: 'Género',
          widget: 'select',
          choices: choicesList.getFormChoices('gender')
        },
        age: {
          type: DataTypes.ARRAY(DataTypes.INTEGER),
          allownull: false,
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
          label: 'Información general adicional - Incluir leyes, reglamentos y links '
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
        creatorId: {
          type: DataTypes.INTEGER,
        },
      }; // End attributes var.
    }
  });

  instanceMethods = _.extend(modelUtils.instanceMethods, {});

  hooks = _.extend(modelUtils.hooks, {});

  return sequelize.define(
    'opportunity',
     classMethods.buildAttributes(true), {
      hooks: hooks,
      classMethods: classMethods,
      instanceMethods: instanceMethods
  });
};

