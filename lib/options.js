var _ = require('underscore');
var S = require('string');

var choicesList = {
  age: [
    '16-25',
    '26-40',
    '41-64',
    '65+'
  ],
  purpose: {
    'start_business': 'Start A Business',
    'relocate_business': 'Relocate a Business',
    'hire_employees': 'Hire Employees / Interns',
    'train_employees': 'Training Employees'
  },
  businessType: [
    'For Profit Partnership or Corporation',
    'Non-Profit',
    'Sole Proprietor'
  ],
  yearsInBusiness:[
    'Just Starting',
    '3 months to a year',
    '2 Years',
    '2 Years',
    '4 + Years',
  ],
  eligibleBusinessLocation: {
    'anywhere_in_pr': 'Anywhere In Puerto Rico',
    'municipality_in_pr': 'Municipality in Puerto Rico',
    'region_in_pr': 'Region in Puerto Rico',
    'outside_of_pr': 'Outside of Puerto Rico'
  },
  benefitType: {
    tax_break: 'Tax Break',
    loan: 'Loan',
    credit: 'Credit',
    grant: 'Grant',
    reimbursement: 'Reimbursement',
    salary_reimbursement: 'Salary Reimbursement',
    exemption: 'Exemption',
    other: 'Other',
  },
  eligibleEntityTypes: {
    any: 'Any',
    non_profit: 'Non-Profit',
    for_profit: 'For-Profit',
    sole_proprietor: 'Sole Proprietor',
  },
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

var associate = [
  'age',
  'currentEmployeesRequired'
];

exports = module.exports = choicesList;

