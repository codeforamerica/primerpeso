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
  app.get('/sendLeadTest3337', oppQuerySendLeadTest);
};

/**
 * GET /preguntas
 * Build and render FundMe Wizard.
 */
var oppQueryCreate = function(req, res, next) {
  var options = options || {};
  var oppQueryForm = new OppQueryForm();
/*  return res.json({
    form: oppQueryForm.getFormConfig(true), // Deep.
    formInfo: oppQueryForm.getFormConfig(false) // Shallow.
  });*/
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
  return res.json(query);
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
      accordionPanelRenderList: accordionPanelRenderList,
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
  var cartContents = req.session.cart.programs;

  var sendRequestForm = new SendRequestForm();
  return res.render('confirmPicked', {
    title: 'Has seleccionado',
    bodyClass: 'confirmPickedResults',
    pickedResults: cartContents,
    benefitTypes: pickedBenefitTypes,
    accordionPanelRenderList: accordionPanelRenderList,
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
    locals: leadData
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

var oppQuerySendLeadTest = function(req, res, next) {
  var leadData = {"_csrf":"480s45jYCF0ENyh1PGnqSxkI7tQxbD47qF7c4=","name":"Maksim Pecherskiy","phone":"17736777755","email":"maxp37@maxp37.com","address":"1134 Wildberry Ct","municipality":"Wheeling","state":"IL","zip":"60090","areYouInc":"0","legalCompanyName":"","bizAddress":"","bizMunicipality":"","bizState":"PR","bizZip":"","selectedPrograms":[{"benefitName":9,"benefitType":["incentive"],"id":9,"title":"Incentivos contributivos","gender":"any","estimatedTime":"30 days","deadline":"Jan 29th 2017","description":"The new Incentives Code provides fiscal benefits for activities developed in specific areas such as the special development zone of the Traditional Urban Center and the Special Development Corridors, among others which due to their potential for growth and their impact on the economy as a whole are considered a priority. In addition, it provides benefits to more than 21 types of eligible units or businesses.\r\n","purpose":["open_location","export","keep_employees","relocate_business"],"paperwork":["To attract and retain new companies already established in the city.","Please contact office for requirements"],"cost":200,"info":"Disqualifying factors: companies already established in the city that are not planning to grow.  ","name":"IncentivosContributivos","agencyId":1,"agencyName":"Secretaria de Desarrollo Económico de Caguas","agencyWeb":null,"agencyPhone":null,"quantity":1}]};
  //return res.json(leadData);
  var locals = _.extend(res.locals, {
    emailTitle: 'Lead Something',
    leadData: _.omit(leadData, ['_csrf', 'selectedPrograms']),
    selectedPrograms: leadData.selectedPrograms || {}
  });
  mailBoss.send({
    subject: "Formulario de solicitud de PrimerPeso",
    locals: locals
  }, function(err, info) {
    return res.send(info);
  });
}

var accordionPanelRenderList = {
  opportunity: {
    benefitDescription: 'Descripción',
    paperworkRequired: 'Documentación requerida',
    applicationCost: 'Costo de Solicitud',
    additionalGeneralInformation: 'Informacion Adicional'
  },
  agency: {
    name: 'Nombre De Agencia',
    web: 'Sitio Web de Agencia',
    phone: 'Numero de Telefono de Agencia',
  },
  requirements: {
    link: 'Sitio Web Para Obtener Requisito',
    cost: 'Costo del Requisito'
  }
};

