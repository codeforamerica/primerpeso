var _ = require('lodash');
var S = require('string');
var OptionsList = require('./OptionsList');
var mixins = require('./formMixins');

function OppQueryForm() {
  var choicesList = new OptionsList('fundMeWizard');
  this.formConfig = {
    options: {
      fieldSets: {
        purpose: {
          'label': 'Propósito'
        },
        aboutYou: {
          'label': 'Sobre el propietario'
        },
        industry: {
          'label': 'Industria'
        },
        location: {
          'label': 'Ubicación'
        },
        sizeOfBusiness: {
          'label': 'Tamaño del negocio'
        }
      }
    },
    fields: {
      purpose: {
        purpose: {
          type: String,
          required: true,
          label: '¿Para qué utilizarías el financiamiento?',
          tooltip: 'Puedes escoger más de una opción',
          choiceOther: true,
          choices: choicesList.getFormChoices('purpose'),
          widget: 'multiSelect'
        },
        investingOwnMoney: {
          type: String,
          required: true,
          label: '¿Invertirás dinero personal?',
          tooltip: 'Hay algunos programas que requieren de una contrapartida por parte del empresario',
          choices: { 1: 'si', 0: 'no' },
          widget: 'radio'
        },
        moneyInvested: {
          type: String,
          label: '¿Cuál es el monto de tu inversión?',
          tooltip: 'Especifíca el monto que has invertido o que piensas invertir',
          prefix: '$',
          widget: 'text',
          required: false
        }
      },
      aboutYou: {
        gender: {
          required: true,
          label: '¿Cuál es el género de los propietarios?',
          tooltip: 'Selecciona ambos si los propietarios fueran de ambos géneros',
          choices: choicesList.getFormChoices('gender'),
          widget: 'select'
        },
        age: {
          required: true,
          label: '¿Cuál es la edad de los propietarios?',
          tooltip: 'Selecciona varios rangos de edades si hubiese propietarios de diferentes edades',
          choices: choicesList.getFormChoices('age'),
          widget: 'checkbox'
        }
      },
      industry: {
        businessType: {
          type: String,
          required: true,
          label: '¿Cuál es la estructura del negocio?',
          tooltip: 'Algunos programas son específicos para ciertos tipos de estructuras',
          choices: choicesList.getFormChoices('eligibleEntityTypes'),
          widget: 'radio'
        },
        industry: {
          type: String,
          required: true,
          label: '¿En qué industria opera tu negocio?',
          tooltip: 'Si estuvieras incorporado, elige la industria seleccionada para el registro de la Corporación en el Departamento de Estado.',
          choices: choicesList.getFormChoices('eligibleIndustries'),
          widget: 'select',
          choiceOther: true
        }
      },
      location: {
        businessLocation: {
          type: String,
          required: true,
          label: '¿Cuál es la ubicación del negocio?',
          tooltip: 'Si aún no tienes elige los que quieras',
          widget: 'multiSelect',
          choices: choicesList.getFormChoices('eligibleBusinessLocation')
        },
      },
      sizeOfBusiness: {
        employeeNumber: {
          type: String,
          required: true,
          label: '¿Cuántos empleados a tiempo completo tienes?',
          tooltip: 'Recuerda que dos empleados a medio tiempo equivale a un empleado a tiempo completo.',
          widget: 'radio',
          choices: choicesList.getFormChoices('currentEmployeesRequired')
        },
        // @TODO -- this will need a map
        yearsInBusiness: {
          type: String,
          required: true,
          label: '¿Hace cuánto comenzaste operaciones?',
          tooltip: 'Independientemente de haberte registrado selecciona el rango de acuerdo al momento en que comenzasye a vender algún producto o servicio.',
          widget: 'radio',
          choices: choicesList.getFormChoices('yearsInBusiness')
        },
        annualRevenue: {
          type: String,
          required: true,
          label: '¿Cuál es tu Volumen anual?',
          tooltip: 'Selecciona el último año activo.',
          widget: 'radio',
          choices: choicesList.getFormChoices('annualRevenue')
        }
      }
    }
  };
}

_.extend(OppQueryForm.prototype, mixins);

exports = module.exports = OppQueryForm;
