var modelUtils = require('../lib/modelUtils.js');
var _ = require('lodash');
var OptionsList = require('../../lib/OptionsList');

module.exports = function(sequelize, DataTypes) {
  var attributes = {};
  var choicesList = new OptionsList('fundMeWizard');
  var classMethods = {};
  var instanceMethods = {};

  classMethods = _.extend(modelUtils.classMethods, {
    // TODO -- this comes from model utils and doesnt need to be here once the caching of indexjs is gone.
    loadFull: function(options, queryOptions) {
      var findOptions = _.extend(options, {
        include: [
          { model: sequelize.model('opportunity'), as: 'opportunities' }
        ]
      });
      var findQueryOptions = _.extend(queryOptions, {});
      return this.find(findOptions, findQueryOptions);
    },
    getListFields: function() {
      return {
        'id': 'ID',
      };
    },
    _getAttributes: function() {
      // NOTE required true here, but does not affect db.  Only front end.
      return {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true
        },
        purpose: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          required: true,
          label: '¿Para qué utilizarías el incentivo?',
          tooltip: 'Puedes escoger más de una opción',
          choiceOther: true,
          choices: choicesList.getFormChoices('purpose'),
          widget: 'multiSelect',
          multiple: true,
        },
        investingOwnMoney: {
          type: DataTypes.STRING,
          required: true,
          label: '¿Invertirás dinero personal?',
          tooltip: 'Hay algunos programas que requieren de una contrapartida por parte del empresario',
          choices: { 1: 'si', 0: 'no' },
          widget: 'radio'
        },
        moneyInvested: {
          type: DataTypes.STRING,
          label: '¿Cuál es el monto de tu inversión?',
          tooltip: 'Especifíca el monto que has invertido o que piensas invertir',
          prefix: '$',
          widget: 'text',
          required: false
        },
        gender: {
          type: DataTypes.STRING,
          required: true,
          label: '¿Cuál es el género de los propietarios?',
          tooltip: 'Selecciona ambos si los propietarios fueran de ambos géneros',
          choices: choicesList.getFormChoices('gender'),
          widget: 'select'
        },
        age: {
          type: DataTypes.ARRAY(DataTypes.INTEGER),
          required: true,
          label: '¿Cuál es la edad de los propietarios?',
          tooltip: 'Selecciona varios rangos de edades si hubiese propietarios de diferentes edades',
          choices: choicesList.getFormChoices('age'),
          widget: 'checkbox',
          multiple: true
        },
        businessType: {
          type: DataTypes.STRING,
          required: true,
          label: '¿Cuál es la estructura del negocio?',
          tooltip: 'Algunos programas son específicos para ciertos tipos de estructuras',
          choices: choicesList.getFormChoices('eligibleEntityTypes'),
          widget: 'radio'
        },
        industry: {
          type: DataTypes.STRING,
          required: true,
          label: '¿En qué industria opera tu negocio?',
          tooltip: 'Si estuvieras incorporado, elige la industria seleccionada para el registro de la Corporación en el Departamento de Estado.',
          choices: choicesList.getFormChoices('eligibleIndustries'),
          widget: 'select',
          choiceOther: true
        },
        businessLocation: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          required: true,
          label: '¿Cuál es la ubicación del negocio?',
          tooltip: 'Si aún no tienes elige los que quieras',
          widget: 'multiSelect',
          choices: choicesList.getFormChoices('eligibleBusinessLocation'),
          multiple: true
        },
        employeeNumber: {
          type: DataTypes.STRING,
          required: true,
          label: '¿Cuántos empleados a tiempo completo tienes?',
          tooltip: 'Recuerda que dos empleados a medio tiempo equivale a un empleado a tiempo completo.',
          widget: 'radio',
          choices: choicesList.getFormChoices('currentEmployeesRequired')
        },
        // @TODO -- this will need a map
        yearsInBusiness: {
          type: DataTypes.INTEGER,
          required: true,
          label: '¿Hace cuánto comenzaste operaciones?',
          tooltip: 'Independientemente de haberte registrado selecciona el rango de acuerdo al momento en que comenzasye a vender algún producto o servicio.',
          widget: 'radio',
          choices: choicesList.getFormChoices('yearsInBusiness')
        },
        annualRevenue: {
          type: DataTypes.STRING,
          required: true,
          label: '¿Cuál es tu Volumen anual?',
          tooltip: 'Selecciona el último año activo.',
          widget: 'radio',
          choices: choicesList.getFormChoices('annualRevenue')
        },
        // Stuff from Send Request Form
        name: {
          type: DataTypes.STRING,
          label: 'Nombre',
          widget: 'text'
        },
        phone: {
          type: DataTypes.STRING,
          label: 'Número de teléfono',
          widget: 'text'
        },
        email: {
          type: DataTypes.STRING,
          label: 'Correo electrónico',
          widget: 'email'
        },
        address: {
          type: DataTypes.STRING,
          label: 'Dirección postal',
          widget: 'text'
        },
        municipality: {
          type: DataTypes.STRING,
          label: 'Municipio / Ciudad',
          widget: 'text',
        },
        state: {
          type: DataTypes.STRING,
          label: 'Estado',
          widget: 'select',
          choices: choicesList.getFormChoices('statesList'),
          value: 'PR'
        },
        zip: {
          type: DataTypes.STRING,
          label: 'Código Postal',
          widget: 'text'
        },
        areYouInc: {
          type: DataTypes.STRING,
          required: true,
          label: '¿Estas incorporado?',
          widget: 'radio',
          choices: { 0: "No", 1: "Si" }
        },
        legalCompanyName: {
          type: DataTypes.STRING,
          label: 'Nombre legal de la Compañía',
          widget: 'text'
        },
        bizAddress: {
          type: DataTypes.STRING,
          label: 'Dirección postal',
          widget: 'text'
        },
        bizMunicipality: {
          type: DataTypes.STRING,
          label: 'Municipio',
          widget: 'text',
        },
        bizState: {
          type: DataTypes.STRING,
          label: 'Estado',
          widget: 'select',
          choices: choicesList.getFormChoices('statesList'),
          value: 'PR'
        },
        bizZip: {
          type: DataTypes.STRING,
          label: 'Código Postal',
          widget: 'text'
        },
      }
    },
  });
  instanceMethods = _.extend(modelUtils.instanceMethods, {});

  return sequelize.define('submission',
    classMethods.buildAttributes(true), {
    classMethods: classMethods,
    instanceMethods: instanceMethods
  });
}
