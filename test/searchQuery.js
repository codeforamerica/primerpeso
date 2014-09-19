var S = require('string');
var _ = require('lodash');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var Sequelize = require('sequelize');
var Promise = require('bluebird');
var should = chai.should();
var db = require('../models');
var sequelize = db.sequelize;
var Opportunity = sequelize.model('opportunity');
var Agency = sequelize.model('agency');
var Searcher = require('../lib/SearchQuery');
var searchQueryMock = require('./mocks/searchQuery');
//var searchResultMock = require('./mocks/searchResults');
var oppMock = require('./mocks/opportunity.js');
var agencyMock = require('./mocks/agency.js');

chai.use(chaiAsPromised);

var oppOverrideSet = [
  // Match
  {
    title:   "TEST: Opportunity Match",
    purpose: ["start_business", "export"],
    gender:  "male",
    benefitType: ["incentive", "grant"]
  },
  // No Match
  {
    title:   "TEST: Opportunity No Match",
    purpose: ["relocate_business", "open_franchise"],
    gender:  "female",
    benefitType: ["incentive", "loan"]
  },
  // Match Other
  {
    title:   "TEST: Opportunity Match Other",
    purpose: ["other"],
    //gender:  "other" // @TODO -- for some reason this breaks.
  },
  // Match Any
  {
    title:   "TEST: Opportunity Match Any",
    purpose: ["anything"],
    gender:  "any",
    benefitType: ["expertise"]
  },
  // Test of other benefit types
  {
    title:   "TEST: Opportunity Other Benefit Types",
    purpose: ["anything"],
    gender:  "any",
    benefitType: ["expertise", "monkeys", "other"]
  }
];

function createOpportunity(overrides, done) {
  var body = oppMock(overrides);
  // We can depend on this because it's getting covered in another test.
  return Opportunity.createInstance(body).then(function(savedInstance) {
    console.log('INSTANCE CREATED');
    return savedInstance;
  })
  .catch(function(err) {
    return done(err);
  });
}

function deleteOpportunity(overrides, done) {
  return Opportunity.destroy({ title: overrides.title });
}

describe('Search Query', function() {

  // Setup.
  before(function(done) {
    // Initialize and save opportunity mocks to run searches against.
    // Create mock agency.
    var oppPromises = [];
    var agencyBody = agencyMock();
    Agency.createInstance(agencyBody).success(function(agency) {
      _.each(oppOverrideSet, function(overrides, index) {
        overrides.agencyId = agency.id;
        oppOverrideSet[index].agencyId = agency.id;
        oppPromises.push(createOpportunity(overrides, done));
      });
      Promise.all(oppPromises).then(function() {
        return done();
      });
    }).error(function(err) {
      return done(err);
    });

  });

  // TearDown.
  after(function(done) {
    var oppPromises = [];
    _.each(oppOverrideSet, function(overrides, index) {
      oppPromises.push(Opportunity.destroy({ title: overrides.title }));
    });
    // Destroy agency.
    oppPromises.push(Agency.destroy({ id: oppOverrideSet[0].agencyId }));
    Promise.all(oppPromises).then(function() {
      return done();
    });
  });

  describe('Return Structure', function() {
    var searchResult;
    var benefitTypes, searchResult;
    before(function(done) {
      var searchMock = new searchQueryMock({ gender: 'male' });
      var searcher = new Searcher(searchMock);

      searcher.execute().success(function() {
        benefitTypes = Searcher.extractBenefitTypes(searcher.result);
        searchResult = Searcher.structureResultByBenefitType(benefitTypes, searcher.formatResult());
        return done();
      });
    });


    it('should properly extract benefit types', function(done) {
      var benefitTypesKeys = _.keys(benefitTypes);
      benefitTypesKeys.should.include('incentive');
      benefitTypesKeys.should.include('grant');
      benefitTypesKeys.should.include('expertise');
      return done();
    });

    it('should properly exclude not explicitly defined other types', function(done) {
      var benefitTypesKeys = _.keys(benefitTypes);
      benefitTypesKeys.should.include('other');
      benefitTypesKeys.should.include('expertise');
      benefitTypesKeys.should.not.include('monkeys');
      return done();
    });

    it('should place opportunities with multiple benefits in different top keys, multiple times', function(done) {
      //searchResult.incentive.TESTOpportunityMatch.should.eql(searchResult.grant.TESTOpportunityMatch);
      // Get id for TestOpportunityMatch
      var matchOpp = _.find(searchResult.incentive, function(opp) {
        if (opp.title === 'Test: opportunity match')
          return true;
      });
      matchOpp.should.eql(searchResult.grant[matchOpp.id]);
      return done();
    });
  });


  describe('Single to Single', function() {
    it('should find opportunities with matching gender, any or other when I search for male; and not find those without match.', function(done) {
      var searchResult;
      var searchMock = new searchQueryMock({ gender: 'male' });
      var searcher = new Searcher(searchMock);
      searcher.execute().success(function(result) {
        _.each(result, function(element, index) {
          ['any', 'male', 'other'].should.contain(element.gender);
          element.gender.should.not.equal('female');
        });
        return done();
      });
    });

    it('should find opportunities marked as any, other, male or female when I search for any', function(done) {
      var searchResult;
      var searchMock = new searchQueryMock({ gender: 'any' });
      var searcher = new Searcher(searchMock);
      searcher.execute().success(function(result) {
        _.each(result, function(element, index) {
          ['any', 'male', 'other', 'female'].should.contain(element.gender);
        });
        return done();
      });
    });
  });

  describe('Single to Multiple', function() {
    it('should find opportunity with matching purpose in set');
    it('should NOT find opportunity with no matching purpose');
    it('should find opportunities with OTHER purpose in set, no matter what purpose is picked')
    it('should find opportunities with anything purpose in set, no matter what purpose is picked')
  });

});
