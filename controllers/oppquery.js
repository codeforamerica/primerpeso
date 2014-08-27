var _ = require('lodash');
var OppQueryForm = require('../lib/OppQueryForm.js');
var SendRequestForm = require('../lib/SendRequestForm.js');
var searchResults = require('../test/mocks/searchResults');
var Searcher = require('../lib/SearchQuery');
var MailBoss = require('../lib/MailBoss');
var mailBoss = new MailBoss();

module.exports = function(app) {
  app.get('/preguntas', oppQueryCreate);
  app.get('/results', oppQueryExecute);
  app.get('/results/picked/confirm', oppQueryConfirmPickedResults);
  app.post('/results/pick', oppQueryPickResults);
  app.post('/sendlead', oppQuerySendLead);
  app.get('/sendlead', oppQuerySendLead);
};

/**
 * GET /preguntas
 * Build and render FundMe Wizard.
 */
var oppQueryCreate = function(req, res, next) {
  var options = options || {};
  var oppQueryForm = new OppQueryForm();
  res.render('fundmeWizard', {
    title: 'Preguntas',
    bodyClass: 'fundmeWizard',
    form: oppQueryForm.getFormConfig(true), // Deep.
    formInfo: oppQueryForm.getFormConfig(false) // Shallow.
  });
};

/**
 * Get /results
 * Get the query request, execute, and redner the results page
 */
var oppQueryExecute = function(req, res, next) {
  var query = req.query;
  var searcher = new Searcher(query);
  searcher.execute().success(function() {
    var benefitTypes = Searcher.extractBenefitTypes(searcher.result);
    var searchResult = Searcher.structureResultByBenefitType(benefitTypes, searcher.formatResult());

    return res.render('searchResults', {
      title: 'Ver Resultados',
      bodyClass: 'searchResults',
      displayCart: true,
      searchResult: searchResult,
      benefitTypes: benefitTypes,
      meta: { type: 'searchResults' }
    });
  });
};

/**
 * POST /results/pick
 * Receives the results from Cart's XHR request. Stores them in session.
 */
var oppQueryPickResults = function(req, res, next) {
  // TODO -- security hoooolllleeee?
  // Recycle Searcher to format the incoming result from collection.
  // Don't re-format.
  var pickedBenefitTypes = Searcher.extractBenefitTypes(req.body);
  req.session.cart = { programs: req.body };
  return res.json(200, {status: 'ok'});
}
/**
 * GET /results/picked/confirm
 * This is the page that successful cart save redirects to.
 * Checks for cart data, and if they exist, builds the confirm page.
 */

var oppQueryConfirmPickedResults = function(req, res, next) {
  if (_.isEmpty(req.session.cart.programs))
    return res.redirect('/preguntas');

  var pickedBenefitTypes = Searcher.extractBenefitTypes(req.session.cart.programs);
  var cartContents = Searcher.structureResultByBenefitType(pickedBenefitTypes, req.session.cart.programs);

  var sendRequestForm = new SendRequestForm();
  return res.render('confirmPicked', {
    title: 'Has seleccionado',
    bodyClass: 'confirmPickedResults',
    pickedResults: cartContents,
    benefitTypes: pickedBenefitTypes,
    form: sendRequestForm.getFormConfig(true), // Deep.
    formInfo: sendRequestForm.getFormConfig(false), // Shallow.
    meta: { type: 'confirmPicked' }
  });
};

/**
 * POST /sendLead
 * Handler for sending lead.  Returns confirm page
 */
var oppQuerySendLead = function(req, res, next) {
  var leadData = req.body;
  leadData.selectedPrograms = req.session.cart.programs || {};
  mailBoss.send({
    subject: "Formulario de solicitud de PrimerPeso",
    text: JSON.stringify(leadData, null, 4)
  }, function(err, info) {
      console.log(err);
      console.log(info);
      if (err)
        req.flash('errors', { msg: err.message });

      return res.render('leadSentConfirmation', {
        title: 'Solicitud Enviada',
        bodyClass: 'leadSentConfirmation',
        meta: { type: 'leadSentConfirmation' },
        leadData: leadData
      });
  });
}

var buildLeadDataForConfirmPage = function(leadData) {
  // Extract all selections and normalize them.
  var selections = {};
  _.each(leadData.selectedPrograms, function(progsOfType, typeName) {
    _.each(progsOfType, function(programData, programName) {
      selections[programData.agencyName] = selections[programData.agencyName] || {};
      selections[programData.agencyName][programName] = programData;
    });
  });
  leadData.selectedPrograms = selections;
}
