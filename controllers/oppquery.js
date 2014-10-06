var _ = require('lodash');
var OppQueryForm = require('../lib/OppQueryForm.js');
var SendRequestForm = require('../lib/SendRequestForm.js');
var searchResults = require('../test/mocks/searchResults');
var Searcher = require('../lib/SearchQuery');
var MailBoss = require('../lib/MailBoss');
var mailBoss = new MailBoss();
var db = require('../models');
var sequelize = db.sequelize;

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
    // Store query in session.
    req.session.query = query;
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
  if (_.isEmpty(req.session.cart) || _.isEmpty(req.session.query) || _.isEmpty(req.session.cart.programs))
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
  var leadData = {
    selectedPrograms: req.session.cart.programs || {},
    query: req.session.query || {},
    submitter: req.body
  };
  return res.json(leadData);
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
  var leadData = {"selectedPrograms":[{"benefitName":9,"benefitType":["incentive"],"id":9,"title":"Incentivos contributivos","purpose":["open_location","export","keep_employees","relocate_business"],"eligibleBusinessLocation":["caguas"],"paperworkRequired":["To attract and retain new companies already established in the city.","Please contact office for requirements"],"applicationCost":200,"applicationDeadline":"2017-01-30T00:00:00.000Z","avgApplicationTime":"30 days","benefitDescription":"The new Incentives Code provides fiscal benefits for activities developed in specific areas such as the special development zone of the Traditional Urban Center and the Special Development Corridors, among others which due to their potential for growth and their impact on the economy as a whole are considered a priority. In addition, it provides benefits to more than 21 types of eligible units or businesses.\r\n","agencyId":1,"agencyContactName":"Zamia Baerga","agencyContactEmail":"zamia.baerga@caguas.gov.pr","agencyContactPhone":"7876538833","minimumYearsInBusiness":0,"eligibleEntityTypes":["any"],"currentEmployeesRequired":["any"],"annualRevenue":["any"],"eligibleIndustries":["11","42","51","54","56","61","62","48-49","other"],"gender":"any","age":[0],"additionalDemographics":["any"],"additionalGeneralInformation":"Disqualifying factors: companies already established in the city that are not planning to grow.  ","investingOwnMoney":"false","moneyInvested":"","creatorId":8,"createdAt":"2014-07-02T18:42:16.317Z","updatedAt":"2014-09-11T22:00:42.098Z","agency":{"id":1,"name":"Secretaria de Desarrollo Económico de Caguas","mission":null,"phone":null,"fax":null,"email":null,"address":null,"municipality":null,"state":null,"zip":null,"web":null,"creatorId":1,"createdAt":"2014-09-10T16:37:30.288Z","updatedAt":"2014-09-10T16:37:30.288Z"},"requirements":[],"quantity":1}],"query":{"gender":"any","age":"1","purpose":"relocate_business","purposeOther":"","investingOwnMoney":"1","moneyInvested":"33","businessType":"for_profit","industry":"accommodation","businessLocation":"anywhere_in_pr","employeeNumber":"6_25","yearsInBusiness":"3","annualRevenue":"100000_499999"},"submitter":{"_csrf":"d1Nt1YAoQplkiC4LBdEhi9hgc6VuK0xwd7pmI=","name":"Maksim Pecherskiy","phone":"17736777755","email":"maxp37@maxp37.com","address":"1134 Wildberry Ct","municipality":"Wheeling","state":"IL","zip":"60090","areYouInc":"1","legalCompanyName":"Maksimize","bizAddress":"3614 N. Ashland Suite 2","bizMunicipality":"Chicago","bizState":"IL","bizZip":"60613"}};
  var Submission = sequelize.model('submission');
  var subSaveData = _.extend(leadData.query, _.omit(leadData.submitter, ['_csrf']));
  subSaveData.purpose = ['relocate_business', 'greed'];
  Submission.create(subSaveData).success(function(result) {
    return res.json(result);
  });

  /*var locals = _.extend(res.locals, {
    emailTitle: 'Lead Something',
    leadData: _.omit(leadData, ['_csrf', 'selectedPrograms']),
    selectedPrograms: leadData.selectedPrograms || {}
  });
  mailBoss.send({
    subject: "Formulario de solicitud de PrimerPeso",
    locals: locals
  }, function(err, info) {
    return res.send(info);
  });*/
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

