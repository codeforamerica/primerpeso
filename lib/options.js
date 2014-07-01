var _ = require('underscore');
var S = require('string');

var choicesList = {
  age: [
    'Any',
    '16-25',
    '26-40',
    '41-64',
    '65+'
  ],
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
    'other': 'Other (Please specify below)'
  },
  businessType: {
    'For Profit Partnership or Corporation': 'For Profit Partnership or Corporation',
    'Non-Profit': 'Non-Profit',
    'Sole Proprietor': 'Sole Proprietor',
    'Any': 'Any',
  },
  yearsInBusiness:{
    'Any': 'Any',
    'Less than 3 months': 'Less than 3 months',
    'Between 3 months and 1 year': 'Between 3 months and 1 year',
    '2 Years': '2 Years',
    '3 Years': '3 Years',
    '4+ Years': '4+ Years',
  },
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
    salary_reimbursement: 'Salary Reimbursement',
    expertise: 'Expertise',
    other: 'Other (Please specify below)',
  },
  eligibleEntityTypes: {
    any: 'Any',
    non_profit: 'Non-Profit',
    for_profit: 'For-Profit',
    sole_proprietor: 'Sole Proprietor',
  },
  currentEmployeesRequired: [
    'Any',
    '1-5',
    '6-25',
    '26-50',
    '51-200',
    '200+'
  ],
  annualRevenue: {
    'Any': 'Any',
    '0–99,999': '0–99,999',
    '100,000-499,999': '100,000-499,999',
    '500,000-999,999': '500,000-999,999',
    '1 million-4.9 million': '1 million-4.9 million',
    '5 million-9.9 million': '5 million-9.9 million',
    'More than 10 million': 'More than 10 million'
  },
  eligibleIndustries: {
    'Any': 'Any',
    'Agriculture': 'Agriculture',
    'Tourism': 'Tourism',
    'Finance and Insurance': 'Finance and Insurance',
    'Accommodation': 'Accommodation',
    'Food & Drink services': 'Food & Drink services',
    'Art, entertainment': 'Art, entertainment',
    'Construction': 'Construction',
    'Pharmaceuticals': 'Pharmaceuticals',
    'Biotechnology': 'Biotechnology',
    'Wholesale Trade': 'Wholesale Trade',
    'Health care': 'Health care',
    'Information / media / internet': 'Information / media / internet',
    'Public administration': 'Public administration',
    'Real estate': 'Real estate',
    'Transportation': 'Transportation',
    'Retail': 'Retail',
    'Manufacture': 'Manufacture',
    'Auto repair': 'Auto repair',
    'Education': 'Education',
    'Utilities': 'Utilities',
    'Professional, Scientific and Technical Services': 'Professional, Scientific and Technical Services',
    'Management of Companies and Enterprises': 'Management of Companies and Enterprises',
    'Administrative Support, Waste Management and Remediation Services': 'Administrative Support, Waste Management and Remediation Services',
    'other': 'other'
  },
  municipalities: {
    "Aguadilla": "Aguadilla",
    "Bayamon": "Bayamon",
    "Cabo Rojo": "Cabo Rojo",
    "Caguas": "Caguas",
    "San juan": "San juan",
    "Cidra": "Cidra",
    "Humacao": "Humacao",
    "Ponce": "Ponce",
    "Carolina": "Carolina",
    "Adjuntas": "Adjuntas",
    "Aguada": "Aguada",
    "Aguas Buenas": "Aguas Buenas",
    "Aibonito": "Aibonito",
    "Anasco": "Anasco",
    "Arecibo": "Arecibo",
    "Arroyo": "Arroyo",
    "Barceloneta": "Barceloneta",
    "Barranquitas": "Barranquitas",
    "Camuy": "Camuy",
    "Canovanas": "Canovanas",
    "Catano": "Catano",
    "Cayey": "Cayey",
    "Ceiba": "Ceiba",
    "Ciales": "Ciales",
    "Coamo": "Coamo",
    "Comerio": "Comerio",
    "Corozal": "Corozal",
    "Culebra": "Culebra",
    "Dorado": "Dorado",
    "Fajardo": "Fajardo",
    "Florida": "Florida",
    "Guanica": "Guanica",
    "Guayama": "Guayama",
    "Guayanilla": "Guayanilla",
    "Gurabo": "Gurabo",
    "Hatillo": "Hatillo",
    "Hormigueros": "Hormigueros",
    "Isabela": "Isabela",
    "Jayuya": "Jayuya",
    "Juana Diaz": "Juana Diaz",
    "Juncos": "Juncos",
    "Lajas": "Lajas",
    "Lares": "Lares",
    "Las Marias": "Las Marias",
    "Las Piedras": "Las Piedras",
    "Loiza": "Loiza",
    "Luquillo": "Luquillo",
    "Manati": "Manati",
    "Maricao": "Maricao",
    "Maunabo": "Maunabo",
    "Mayaguez": "Mayaguez",
    "Moca": "Moca",
    "Morovis": "Morovis",
    "Naguabo": "Naguabo",
    "Naranjito": "Naranjito",
    "Orocovis": "Orocovis",
    "Patillas": "Patillas",
    "Penuelas": "Penuelas",
    "Quebradillas": "Quebradillas",
    "Rincon": "Rincon",
    "Rio Grande": "Rio Grande",
    "Sabana Grande": "Sabana Grande",
    "Salinas": "Salinas",
    "San German": "San German",
    "San Lorenzo": "San Lorenzo",
    "San Sebastian": "San Sebastian",
    "Santa Isabel": "Santa Isabel",
    "Toa Alta": "Toa Alta",
    "Toa Baja": "Toa Baja",
    "Trujillo Alto": "Trujillo Alto",
    "Utuado": "Utuado",
    "Vega Alta": "Vega Alta",
    "Vega Baja": "Vega Baja",
    "Vieques": "Vieques",
    "Villalba": "Villalba",
    "Yabucoa": "Yabucoa",
    "Yauco": "Yauco"
  }
};



var optionizer = {
  getFormChoices: function(field) {
    var fieldData = choicesList[field];
    var formChoices = {};
    if (_.isArray(fieldData)) {
      _.each(fieldData, function(label, key) {
        var fcKey = this.optionizeValue(label);
        formChoices[fcKey] = label;
      }, this);
    }
    else {
      return fieldData;
    }

    // Should always return an object:  machine_name:label;

  },
  // String manglers.  That's all.
  optionizeValue: function(value, field) {
    if (!field || _.isArray(choicesList[field]))
      return S(value).stripPunctuation().underscore().s;

    // if it's an object, return the mapping from the object.
    return _.indexOf(choicesList[field], value);
  },
  deOptionizeValue: function(value, field) {
    if (!field)
      return S(value).humanize().s;

    else if (_.isArray(choicesList[field])) {
      _.each(choicesList[field], function(el, key) {
        var piece = this.optionizeValue(el);
        if (piece == value)
          return el;
      }, this);
    }

    else if (_.isObject(choicesList[field]))
      return choicesList[field][value];
  }
}

exports = module.exports = optionizer;

