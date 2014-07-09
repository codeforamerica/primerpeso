var oppQueryForm = require('../lib/oppQueryForm.js');

module.exports = function(app) {
  app.get('/fundme', oppQueryCreate);
  app.get('/results/:filter', oppQueryExecute);
};

/**
 * GET /fundme
 * FundMe Wizard.
 */
var oppQueryCreate = function(req, res, next) {
  var options = options || {};
//  return res.json(oppQueryForm.getFormConfig());
  res.render('fundmeWizard', {
    title: 'Wizard',
    bodyClass: 'fundmeWizard',
    form: oppQueryForm.getFormConfig()
  });
};


var oppQueryCreateJson = function(req, res, next) {
  var form = OppQuery.buildForm({ unflatten: true });
  res.json(form);
}

var oppQueryExecute = function(req, res, next) {
  var searchResult = {
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
  res.render('searchResults', {
    title: 'Search Results',
    bodyClass: 'searchResults',
    isSearch: true,
    searchResult: searchResult
  });
};
