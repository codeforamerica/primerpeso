var _ = require('lodash');
var S = require('string');

function OptionsList(formName) {
  this.formName = formName || 'adminForm';
  this.options = getOptionsList();
  this.overrides = choicesOverrideList(this.formName);
}

/** Public / Protos **/

OptionsList.prototype.getFormChoices = function(field) {
  var fieldData = this.options[field] || {};
  var formChoices = _.isArray(fieldData) ? _.zipObject(_.keys(fieldData), fieldData) : fieldData;
  if (this.overrides[field]) {
    performOverrides(formChoices, this.overrides[field]);
  }
  return formChoices;
};

OptionsList.optionizeValue = function (value, field) {
  if (!field && !_.isEmpty(value))
      return S(value).stripPunctuation().underscore().s;

  // If it's an object or array, return the mapping from the object.
  return _.indexOf(choicesList[field], value);
};

OptionsList.deOptionizeValue = function(value, field) {
  if (!field)
    return S(value).humanize().s;

  else if (_.isObject(choicesList[field]) || _.isArray(choicesList[field]))
    return choicesList[field][value];
};

/** Privates **/

function performOverrides(formChoices, overrides) {
  _.each(overrides, function(overrideValue, overrideKey) {
    if (!_.isUndefined(formChoices[overrideKey])) {
      // If explicitly set to NULL, delete the key.
      if (overrideValue === null)
        delete formChoices[overrideKey];
      // If value is provided override with value.
      else
        formChoices[overrideKey] = overrideValue;
    }
    // If the override key does not exist in original options, add.
    else {
      formChoices[overrideKey] = overrideValue;
    }
  });
}

function getOptionsList() {
  return {
    age: {
      '0': 'Cualquier',
      '1': '16-25',
      '2': '26-40',
      '3': '41-64',
      '4': '65+'
    },
    gender: {
      any: 'Cualquier',
      male: 'Hombre',
      female: 'Mujer',
      other_gender: 'Otro'
    },
    purpose: {
      'anything': 'Cualquier',
      'start_business': 'Empezar un Negocio',
      'relocate_business': 'Reubicar un Negocio',
      'hire_employees': 'Contratar Empleados  / Pasantes',
      'train_employees': 'Entrenar Empleados',
      'buy_equipment': 'Comprar Equipo',
      'open_location': 'Abrir un Nuevo Local',
      'export': 'Exportar',
      'open_franchise': 'Abrir una Franquicia',
      'improve_commercial_property': 'Mejorar una propiedad comercial',
      'buy_commercial_property': 'Comprar una propiedad comercial',
      'working_capital': 'Capital de trabajo',
      'other': 'Otro (Por favor especifíca el otro propósito)'
    },
    businessType: {
      'for_profit': 'Corporación o Asociación con fines de lucro',
      'non_profit': 'Organización sin fines de lucro',
      'sol_prop': 'Unico Propietario',
      'any': 'Cualquier',
    },
    yearsInBusiness: [
      'Cualquier',
      'Menos de tres',
      'Entre 3 años y 1 año',
      '2 Años',
      '3 Años',
      '4+ Años'
    ],
    eligibleBusinessLocation: {
      'anywhere_in_pr': 'Cualquier lugar de Puerto Rico',
      'municipality_in_pr': 'Municipalidad de Puerto Rico',
      'outside_of_pr': 'Fuera de Puerto Rico',
      'other': 'Otro (Por favor especificar debajo)'
    },
    benefitType: {
      incentive: 'Incentivo',
      loan: 'Crédito',
      grant: 'Beca',
      reimbursement: 'Reembolso de salario',
      expertise: 'Talleres',
      other: 'Otros (Por favor especificar debajo)',
    },
    eligibleEntityTypes: {
      any: 'Cualquier',
      non_profit: 'Organización sin fines de lucro',
      for_profit: 'Corporación o Asociación con fines de lucro ',
      sole_proprietor: 'Unico Propietario',
    },
    currentEmployeesRequired: {
      'any': 'Cualquier',
      '1_5': '1-5',
      '6_25': '6-25',
      '26_50': '26-50',
      '51_200': '51-200',
      '200_': '200+'
    },
    annualRevenue: {
      'any': 'Cualquier',
      '0_99999': '0–99,999',
      '100000_499999': '100,000-499,999',
      '500000_999999': '500,000-999,999',
      '1000000_4900000': '1 millón-4.9 millones',
      '5000000_9900000': '5 millones-9.9 millones',
      '10000000_': 'Más de 10 millones'
    },
    eligibleIndustries: {
      'any': 'Cualquier',
      'agriculture': 'Agriculture',
      'tourism': 'Tourism',
      'finance_and_insurance': 'Finance and Insurance',
      'accommodation': 'Accommodation',
      'food_drink_services': 'Food & Drink services',
      'art_entertainment': 'Art, entertainment',
      'construction': 'Construction',
      'pharmaceuticals': 'Pharmaceuticals',
      'biotechnology': 'Biotechnology',
      'wholesale_trade': 'Wholesale Trade',
      'health_care': 'Health care',
      'information_media_internet': 'Information / media / internet',
      'public_administration': 'Public administration',
      'real_estate': 'Real estate',
      'transportation': 'Transportation',
      'retail': 'Retail',
      'manufacture': 'Manufacture',
      'auto_repair': 'Auto repair',
      'education': 'Education',
      'utilities': 'Utilities',
      'professional_scientific_and_technical_services': 'Professional, Scientific and Technical Services',
      'management_of_companies_and_enterprises': 'Management of Companies and Enterprises',
      'administrative_support_waste_management_and_remediation_services': 'Administrative Support, Waste Management and Remediation Services',
      'other': 'other'
    },

    municipalities: {
      'aguadilla': 'Aguadilla',
      'bayamon': 'Bayamon',
      'cabo_rojo': 'Cabo Rojo',
      'caguas': 'Caguas',
      'san_juan': 'San juan',
      'cidra': 'Cidra',
      'humacao': 'Humacao',
      'ponce': 'Ponce',
      'carolina': 'Carolina',
      'adjuntas': 'Adjuntas',
      'aguada': 'Aguada',
      'aguas_buenas': 'Aguas Buenas',
      'aibonito': 'Aibonito',
      'anasco': 'Anasco',
      'arecibo': 'Arecibo',
      'arroyo': 'Arroyo',
      'barceloneta': 'Barceloneta',
      'barranquitas': 'Barranquitas',
      'camuy': 'Camuy',
      'canovanas': 'Canovanas',
      'catano': 'Catano',
      'cayey': 'Cayey',
      'ceiba': 'Ceiba',
      'ciales': 'Ciales',
      'coamo': 'Coamo',
      'comerio': 'Comerio',
      'corozal': 'Corozal',
      'culebra': 'Culebra',
      'dorado': 'Dorado',
      'fajardo': 'Fajardo',
      'florida': 'Florida',
      'guanica': 'Guanica',
      'guayama': 'Guayama',
      'guayanilla': 'Guayanilla',
      'gurabo': 'Gurabo',
      'hatillo': 'Hatillo',
      'hormigueros': 'Hormigueros',
      'isabela': 'Isabela',
      'jayuya': 'Jayuya',
      'juana_diaz': 'Juana Diaz',
      'juncos': 'Juncos',
      'lajas': 'Lajas',
      'lares': 'Lares',
      'las_marias': 'Las Marias',
      'las_piedras': 'Las Piedras',
      'loiza': 'Loiza',
      'luquillo': 'Luquillo',
      'manati': 'Manati',
      'maricao': 'Maricao',
      'maunabo': 'Maunabo',
      'mayaguez': 'Mayaguez',
      'moca': 'Moca',
      'morovis': 'Morovis',
      'naguabo': 'Naguabo',
      'naranjito': 'Naranjito',
      'orocovis': 'Orocovis',
      'patillas': 'Patillas',
      'penuelas': 'Penuelas',
      'quebradillas': 'Quebradillas',
      'rincon': 'Rincon',
      'rio_grande': 'Rio Grande',
      'sabana_grande': 'Sabana Grande',
      'salinas': 'Salinas',
      'san_german': 'San German',
      'san_lorenzo': 'San Lorenzo',
      'san_sebastian': 'San Sebastian',
      'santa_isabel': 'Santa Isabel',
      'toa_alta': 'Toa Alta',
      'toa_baja': 'Toa Baja',
      'trujillo_alto': 'Trujillo Alto',
      'utuado': 'Utuado',
      'vega_alta': 'Vega Alta',
      'vega_baja': 'Vega Baja',
      'vieques': 'Vieques',
      'villalba': 'Villalba',
      'yabucoa': 'Yabucoa',
      'yauco': 'Yauco'
    }
  };
}

function choicesOverrideList(formName) {
  var choicesOverrides = {
    fundMeWizard: {
      gender: {
        any: 'Ambos - si varios propietarios', // Change label.
        other_gender: null, // Delete other.
      },
      age: {
        '0': null
      },
      eligibleEntityTypes: {
        any: null
      },
      currentEmployeesRequired: {
        any: null
      },
      yearsInBusiness: {
        '0': null
      },
      annualRevenue: {
        any: null
      }
    }
  }
  return choicesOverrides[formName] || {};
}


exports = module.exports = OptionsList;
