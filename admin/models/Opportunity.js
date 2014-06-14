var keystone = require('keystone'),
    Types = keystone.Field.Types;

var choicesList = require('../choices');

var opSchema = {
  title:  { type: String, required: true, unique: true, label: 'Program Title', includeList: true, initial: true },
  purpose: { type: String, required: true, widget: 'textArea', initial: true },
  // @TODO -- handle bOOL
  canBeReappliedFor: {
    type: String,
    default: false,
    widget: 'select',
    choices: ['No', 'Yes']
  },
  disqualifyingFactors: {
    type: String,
    required: true,
    default: 'none',
    widget: 'textArea'
  },
  applicationCost: { type: Types.Money, required: true, initial: true },
  applicationDeadline: { type: Date, required: true, widget: 'date' },
  avgApplicationTime: { type: String, required: true },
  // TODO -- abstract choices to freaking callbacks.
};

var Opportunity = new keystone.List('Opportunity', {
  autokey: { path: 'slug', from: 'title', unique: true },
  map: { name: 'title' },
  defaultSort: '-createdAt'
});

Opportunity.add(opSchema);
Opportunity.defaultColumns = 'title';
Opportunity.register();
