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
  if (!field)
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
      other: 'Other'
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
    eligibleBusinessLocation: {
      'anywhere_in_pr': 'Anywhere In Puerto Rico',
      'municipality_in_pr': 'Municipality in Puerto Rico',
      'outside_of_pr': 'Outside of Puerto Rico',
      'other': 'Other (Please specify below)'
    },
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
      'any': 'Any',
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
        any: 'Both - if multiple owners', // Change label.
        other: null, // Delete other.
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
