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
  var options = this.options || getOptionsList();
  var result = null;
  if (!field)
    result = S(value).humanize().s;

  else if (_.isObject(options[field]) || _.isArray(options[field]))
    result = options[field][value];

  return result;
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
      'anything': 'Cualquiera',
      'open_location': 'Abrir un Nuevo Local',
      'open_franchise': 'Abrir una Franquicia',
      'train_employees': 'Adiestrar Empleados',
      'working_capital': 'Capital de trabajo',
      'buy_equipment': 'Comprar Equipo',
      'buy_commercial_property': 'Comprar una propiedad comercial',
      'hire_employees': 'Contratar Empleados  / Pasantes',
      'start_business': 'Crear un Negocio',
      'export': 'Exportar',
      'export_products': 'Exportar productos',  
      'export_services': 'Exportar servicios',  
      'improve_commercial_property': 'Mejorar una propiedad comercial',
      'cinematographic_production': 'Producción Cinematográfica',
      'keep_employees': 'Retener empleados', 
      'relocate_business': 'Reubicar un Negocio',      
      'other': 'Otro (Por favor especifíca el propósito)'

      

    },
    businessType: {
      'for_profit': 'Corporación o Asociación con fines de lucro',
      'non_profit': 'Organización sin fines de lucro',
      'sol_prop': 'Unico Propietario',
      'any': 'Cualquier',
    },
    yearsInBusiness: [
      'Cualquier',
      'Sin Comienzo',
      'Menos de tres meses',
      'Entre 3 meses y 1 año',
      '2 Años',
      '3 Años',
      '4+ Años'
    ],
    benefitType: {
      incentive: 'Incentivos',
      loan: 'Créditos',
      grant: 'Becas',
      reimbursement: 'Reembolsos',
      expertise: 'Talleres',
      financing: 'Financiamiento',
      credit_line: 'Línea de Crédito',
      other: 'Otros',
    },
    eligibleEntityTypes: {
      any: 'Cualquier',
      non_profit: 'Organización sin fines de lucro',
      for_profit: 'Corporación o Asociación con fines de lucro ',
      sole_proprietor: 'Unico Propietario',
    },
    currentEmployeesRequired: {
      'any': 'Cualquier',
      'none': '0',
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
      "any": "Cualquiera",
      "11": "11 - Agricultura, Silvicultura, Caza y Pesca",
      "21": "21 - Extracción de Gas y Petróleo",
      "22": "22 - Utilidades",
      "23": "23 - Construcción",
      "31-33": "31-33 Manufactura",
      "42": "42 - Comercio al por mayor",
      "44-45": "44-45 - Comercio al por menor",
      "48-49": "48-49 - Transporte y Almacén",
      "51": "51 - Información",
      "52": "52 - Finanzas y Seguros",
      "53": "53 - Bienes Raíces, Alquiler y Arrendamiento",
      "54": "54 - Servicios profesionales, científicos y técnicos",
      "56": "56 - Administración y apoyo, central de desechos y servicios de reparación",
      "61": "61 - Servicios educativos",
      "62": "62 - Cuidados de salud y asistencia social",
      "71": "71 - Artes, Entretenimiento y Recreación",
      "72": "72 - Alojamiento, Servicios de Alimentos y Lugares para Beber",
      "81": "81 - Otros Servicios (exceptuando la administración pública)",
      "92": "92 - Administración Pública",
      "other": "Otra"
    },

    eligibleBusinessLocation: {
      'anywhere_in_pr': 'Cualquier municipio',
      'adjuntas': 'Adjuntas',
      'aguada': 'Aguada',
      'aguadilla': 'Aguadilla',
      'aguas_buenas': 'Aguas Buenas',
      'aibonito': 'Aibonito',
      'anasco': 'Añasco',
      'arecibo': 'Arecibo',
      'arroyo': 'Arroyo',
      'barceloneta': 'Barceloneta',
      'barranquitas': 'Barranquitas',
      'bayamon': 'Bayamón',
      'cabo_rojo': 'Cabo Rojo',
      'caguas': 'Caguas',
      'camuy': 'Camuy',
      'canovanas': 'Canóvanas',
      'carolina': 'Carolina',
      'catano': 'Cataño',
      'cayey': 'Cayey',
      'ceiba': 'Ceiba',
      'ciales': 'Ciales',
      'cidra': 'Cidra',
      'coamo': 'Coamo',
      'comerio': 'Comerio',
      'corozal': 'Corozal',
      'culebra': 'Culebra',
      'dorado': 'Dorado',
      'fajardo': 'Fajardo',
      'florida': 'Florida',
      'guanica': 'Guánica',
      'guayama': 'Guayama',
      'guayanilla': 'Guayanilla',
      'guaynabo': 'Guaynabo',
      'gurabo': 'Gurabo',
      'hatillo': 'Hatillo',
      'hormigueros': 'Hormigueros',
      'humacao': 'Humacao',
      'isabela': 'Isabela',
      'jayuya': 'Jayuya',
      'juana_diaz': 'Juana Diaz',
      'juncos': 'Juncos',
      'lajas': 'Lajas',
      'lares': 'Lares',
      'las_marias': 'Las Marías',
      'las_piedras': 'Las Piedras',
      'loiza': 'Loíza',
      'luquillo': 'Luquillo',
      'manati': 'Manatí',
      'maricao': 'Maricao',
      'maunabo': 'Maunabo',
      'mayaguez': 'Mayagüez',
      'moca': 'Moca',
      'morovis': 'Morovis',
      'naguabo': 'Naguabo',
      'naranjito': 'Naranjito',
      'orocovis': 'Orocovis',
      'patillas': 'Patillas',
      'penuelas': 'Penuelas',
      'ponce': 'Ponce',
      'quebradillas': 'Quebradillas',
      'rincon': 'Rincón',
      'rio_grande': 'Río Grande',
      'sabana_grande': 'Sabana Grande',
      'salinas': 'Salinas',
      'san_german': 'San German',
      'san_juan': 'San Juan',
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
    },
    statesList: {
      AL: "Alabama",
      AK: "Alaska",
      AS: "American Samoa",
      AZ: "Arizona",
      AR: "Arkansas",
      CA: "California",
      CO: "Colorado",
      CT: "Connecticut",
      DE: "Delaware",
      DC: "District Of Columbia",
      FM: "Federated States Of Micronesia",
      FL: "Florida",
      GA: "Georgia",
      GU: "Guam",
      HI: "Hawaii",
      ID: "Idaho",
      IL: "Illinois",
      IN: "Indiana",
      IA: "Iowa",
      KS: "Kansas",
      KY: "Kentucky",
      LA: "Louisiana",
      ME: "Maine",
      MH: "Marshall Islands",
      MD: "Maryland",
      MA: "Massachusetts",
      MI: "Michigan",
      MN: "Minnesota",
      MS: "Mississippi",
      MO: "Missouri",
      MT: "Montana",
      NE: "Nebraska",
      NV: "Nevada",
      NH: "New Hampshire",
      NJ: "New Jersey",
      NM: "New Mexico",
      NY: "New York",
      NC: "North Carolina",
      ND: "North Dakota",
      MP: "Northern Mariana Islands",
      OH: "Ohio",
      OK: "Oklahoma",
      OR: "Oregon",
      PW: "Palau",
      PA: "Pennsylvania",
      PR: "Puerto Rico",
      RI: "Rhode Island",
      SC: "South Carolina",
      SD: "South Dakota",
      TN: "Tennessee",
      TX: "Texas",
      UT: "Utah",
      VT: "Vermont",
      VI: "Virgin Islands",
      VA: "Virginia",
      WA: "Washington",
      WV: "West Virginia",
      WI: "Wisconsin",
      WY: "Wyoming"
    }
  };
}

function choicesOverrideList(formName) {
  var choicesOverrides = {
    fundMeWizard: {
      purpose: {
        'anything': null  // Remove purpose any from wizard
      },
      gender: {
        any: 'Ambos - si hubieran propietarios de ambos sexos', // Change label.
        other_gender: null, // Delete other.
      },
      age: {
        '0': null
      },
      eligibleBusinessLocation: {
        anywhere_in_pr: null // Remove anywhere in PR option.
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
