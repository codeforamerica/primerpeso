
var dotenv = require('dotenv');
dotenv.load();

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var should = chai.should();
var db = require('../models');
var sequelize = db.sequelize;
var agencyMock = require('./mocks/agency.js');
var opportunityMock = require('./mocks/opportunity.js');
var userMock = require('./mocks/user.js');

chai.use(chaiAsPromised);

describe('Agency Model', function() {

  it('should create a new agency without optional fields', function(done) {
    var body = agencyMock();
    var Agency = sequelize.model('agency');
    Agency.createInstance(body).success(function() {
      return done();
    }).error(function(err) {
      return done(err);
    });
  });

  afterEach(function(done) {
    var Agency = sequelize.model('agency');
    var User = sequelize.model('user');
    Agency.destroy({name: 'My Awesome Agency'}).then(function() {
      return User.destroy({email: 'clara@example.com'});
    }).then(function() {
      return done();
    });
  });

});

describe('Opportunity Model', function() {

  it('should create a new opportunity without optional fields', function(done) {
    var body = opportunityMock();
    var Opportunity = sequelize.model('opportunity');
    Opportunity.createInstance(body).error(function(err) {
      return done(err);
    });
    return done();
  });

  it('should create a new opportunity with optional fields', function(done) {
    var body = opportunityMock({
      'title': 'TEST2',
      'purposeOther': 'A different purpose',
      'additionalGeneralInformation': 'Some other general information'
    });
    var Opportunity = sequelize.model('opportunity');
    Opportunity.createInstance(body).error(function(err) {
      return done(err);
    });
    return done();
  });

  it('should throw an error if a required field is missing', function(done) {
    // applicationCost is missing
    var body = opportunityMock({
      applicationCost: '',
    });
    var Opportunity = sequelize.model('opportunity');
    Opportunity.createInstance(body).error(function(err) {
      should.exist(err);
      return done();
    });
  });

  it('should correctly parse and save "other" text fields', function(done) {
    // purpose other is filled out, additionalGeneralInformation is filled out
    var body = opportunityMock({
      purpose: ['other'],
      'purposeOther': 'A different purpose',
      additionalGeneralInformation: 'Some other general information'
    });

    var Opportunity = sequelize.model('opportunity');
    Opportunity.createInstance(body).then(function() {
      return Opportunity.find({where: {title: 'Test opp3'} });
    }).then(function(op) {
      op.purpose.should.deep.equal(['other', '_a_different_purpose']);
      return done();
    }).error(function(err) {
      return done(err);
    });
  });

  it('should NOT crash when someone picks other and does not enter a string', function(done) {
    // purpose other is filled out, additionalGeneralInformation is filled out
    var body = opportunityMock({
      purpose: ['other'],
      'purposeOther': '',
      additionalGeneralInformation: 'Some other general information'
    });

    var Opportunity = sequelize.model('opportunity');
    Opportunity.createInstance(body).then(function() {
      return Opportunity.find({where: {title: 'Test opp3'} });
    }).then(function(op) {
      op.purpose.should.deep.equal(['other']);
      return done();
    }).error(function(err) {
      return done(err);
    });
  });


  it('should correctly save "other" checkbox fields', function(done) {
    // purpose other is filled out, additionalGeneralInformation is filled out
    var body = opportunityMock({
      eligibleIndustries: [ 'any', 'other', 'Otro Distinto' ]
    });
    var Opportunity = sequelize.model('opportunity');
    Opportunity.createInstance(body).then(function() {
      return Opportunity.find({where: {title: 'Test opp3'} });
    }).then(function(op) {
      op.eligibleIndustries.should.include('Otro Distinto');
      return done();
    }).error(function(err) {
      return done(err);
    });

  });

  it('should fail to create two opportunities with the same title', function(done) {
    var body = opportunityMock();
    var Opportunity = sequelize.model('opportunity');
    Opportunity.createInstance(body).then(function() {
      Opportunity.createInstance(body).should.be.rejected.and.notify(done);
    })
    .error(function(err) {
      return done(err);
    });
  });

  it('should create a new opportunity associated to a user by id', function(done) {
    var body = opportunityMock();
    var userBody = userMock();
    var Opportunity = sequelize.model('opportunity');
    var User = sequelize.model('user');
    var user;
    User.createInstance(userBody).then(function(newUser) {
      user = newUser;
      return Opportunity.createInstance(body);
    }).then(function(op) {
      return user.addOpportunity(op);
    }).then(function() {
      return user.getOpportunities( { attributes: ['title'] });
    }).then(function(results) {
      should.exist(results);
      return done();
    });
  });

  afterEach(function(done) {
    var Opportunity = sequelize.model('opportunity');
    var User = sequelize.model('user');
    Opportunity.destroy({title: 'Test opp3'}).then(function() {
      return User.destroy({email: 'clara@example.com'});
    }).then(function() {
      return Opportunity.destroy({title: 'TEST2'});

    }).then(function() {
      return done();
    });
  });
});
