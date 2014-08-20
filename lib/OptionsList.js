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
      '0': 'Any',
      '1': '16-25',
      '2': '26-40',
      '3': '41-64',
      '4': '65+'
    },
    gender: {
      any: 'Any',
      male: 'Male',
      female: 'Female',
      other_gender: 'Other'
    },
    purpose: {
      'anything': 'Anything',
      'start_business': 'Start A Business',
      'relocate_business': 'Relocate a Business',
      'hire_employees': 'Hire Employees / Interns',
      'train_employees': 'Training Employees',
      'buy_equipment': 'Buy Equipment',
      'open_location': 'Open a new location',
      'export': 'Export',
      'open_franchise': 'Open a franchise',
      'improve_commercial_property': 'Improve a commercial property',
      'buy_commercial_property': 'Buy a commercial property',
      'working_capital': 'Working Capital',
      'other': 'Other (Please specify below)'
    },
    businessType: {
      'for_profit': 'For Profit Partnership or Corporation',
      'non_profit': 'Non-Profit',
      'sol_prop': 'Sole Proprietor',
      'any': 'Any',
    },
    yearsInBusiness: [
      'Any',
      'Less than 3 months',
      'Between 3 months and 1 year',
      '2 Years',
      '3 Years',
      '4+ Years'
    ],
    benefitType: {
      incentive: 'Incentive',
      loan: 'Loan',
      grant: 'Grant',
      reimbursement: 'Salary Reimbursement',
      expertise: 'Expertise',
      other: 'Other (Please specify below)',
    },
    eligibleEntityTypes: {
      any: 'Any',
      non_profit: 'Non-Profit',
      for_profit: 'For-Profit: Corporation, Partnership, LLC',
      sole_proprietor: 'Sole Proprietor',
    },
    currentEmployeesRequired: {
      'any': 'Any',
      '1_5': '1-5',
      '6_25': '6-25',
      '26_50': '26-50',
      '51_200': '51-200',
      '200_': '200+'
    },
    annualRevenue: {
      'any': 'Any',
      '0_99999': '0–99,999',
      '100000_499999': '100,000-499,999',
      '500000_999999': '500,000-999,999',
      '1000000_4900000': '1 million-4.9 million',
      '5000000_9900000': '5 million-9.9 million',
      '10000000_': 'More than 10 million'
    },
    eligibleIndustries: {
      "any": "Any",
      "11": "11 - Agriculture, Forestry, Fishing and Hunting",
      "21": "21 - Mining, Quarrying, and Oil and Gas Extraction",
      "22": "22 - Utilities",
      "23": "23 - Construction",
      "31-33": "31-33 Manufacturing",
      "42": "42 - Wholesale Trade",
      "44-45": "44-45 - Retail Trade",
      "48-49": "48-49 - Transportation and Warehousing",
      "51": "51 - Information",
      "52": "52 - Finance and Insurance",
      "53": "53 - Real Estate and Rental and Leasing",
      "54": "54 - Professional, Scientific, and Technical Services",
      "55": "55 - Management of Companies and Enterprises",
      "56": "56 - Administrative and Support and Waste Management and Remediation Services",
      "61": "61 - Educational Services",
      "62": "62 - Health Care and Social Assistance",
      "71": "71 - Arts, Entertainment, and Recreation",
      "72": "72 - Accommodation and Food Services",
      "81": "81 - Other Services (except Public Administration)",
      "92": "92 - Public Administration",
      "other": "other"
    },

    eligibleBusinessLocation: {
      'anywhere_in_pr': 'Anywhere in Puerto Rico',
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
        any: 'Both - if multiple owners', // Change label.
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
