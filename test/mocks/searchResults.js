var _ = require('lodash');

exports = module.exports = function(overrides) {
  var overrides = overrides || {};

  var searchResults = {
    loans: {
      equipmentFinancing: {
        id: 1,
        title: 'Test Opportunity',
        estimatedTime: '30 dias',
        deadline: '2014-12-30 16:00:00-08',
        description: 'some description',
        name: 'equipmentFinancing'
      },
      mechanicHelp: {
        id: 2,
        title: 'Test Opportunity2',
        estimatedTime: '30 dias',
        deadline: '2014-12-30 16:00:00-08',
        description: 'some description',
        name: 'mechanicHelp'
      },
      phoneBorrowing: {
        id: 3,
        title: 'Test Opportunity3',
        estimatedTime: '30 dias',
        deadline: '2014-12-30 16:00:00-08',
        description: 'some description',
        name: 'phoneBorrowing'
      }
    },
    grants: {
      funGrant: {
        id: 4,
        title: 'Test Opportunity',
        estimatedTime: '30 dias',
        deadline: '2014-12-30 16:00:00-08',
        description: 'some description',
        name: 'funGrant'
      },
      moneyFromTheGovernment: {
        id: 5,
        title: 'Test Opportunity2',
        estimatedTime: '30 dias',
        deadline: '2014-12-30 16:00:00-08',
        description: 'some description',
        name: 'moneyFromTheGovernment'
      },
      somethingElseIrrelevant: {
        id: 6,
        title: 'Test Opportunity3',
        estimatedTime: '30 dias',
        deadline: '2014-12-30 16:00:00-08',
        description: 'some description',
        name: 'somethingElseIrrelevant'
      }
    }
  };
  return _.extend(searchResults, overrides);
}
