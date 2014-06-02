var _ = require('underscore');
var S = require('string');

var choices = {};
var formConfig = {
  form: {},
  fields: {
    // About you.
    name: {
      type: 'String',
      label: 'Your Name',
      section: 'aboutYou'
    },
    // Purpose.
    needed_for: {
      type: 'String',
      label: 'What do you need this finance for?',
      section: 'purpose'
    }
  }
};

exports = module.exports = {
  choices: choices,
  formConfig: formConfig
};

/*exports = module.exports = {
  canBeReappliedFor: ['No', 'Yes'],
  eligibleBusinessLocation: [
    'Anywhere In Puerto Rico',
    'Municipality in Puerto Rico',
    'Region in Puerto Rico',
    'Outside of Puerto Rico'
  ],
  benefitType: [
    'Tax Break',
    'Loan',
    'Credit',
    'Grant',
    'Reimbursement',
    'Salary Reimbursement',
    'Exemption',
    'Other'
  ],
  eligibleEntityTypes: [
    'Any',
    'Non-Profit',
    'For-Profit',
    'Sole Proprietor'
  ],
  currentEmployeesRequired: [
    '1-5',
    '6-25',
    '26-50',
    '51-200',
    '200+'
  ],
  annualRevenue: [
    '0–100,000',
    '100,000-499,999',
    '500,000-999,999',
    '1 million-4,9 million',
    '5 million-9,9 million',
    'More than 10 million'
  ],
  eligibleIndustries: [
    'Agriculture',
    'Tourism',
    'Finance and Insurance',
    'Accommodation, Food & Drink services',
    'Art, entertainment',
    'Construction',
    'Pharmaceuticals',
    'Biotechnology',
    'Wholesale Trade',
    'Health care',
    'Information / media / internet',
    'Public administration',
    'Real estate',
    'Transportation',
    'Retail',
    'Manufacture',
    'Auto repair',
    'Education',
    'Utilities',
    'Mining',
    'Professional, Scientific and Technical Services',
    'Management of Companies and Enterprises',
    'Administrative Support, Waste Management and Remediation Services'
  ]
};

*/
