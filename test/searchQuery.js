var S = require('string');
var _ = require('lodash');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var Sequelize = require('sequelize');
var Promise = Sequelize.Promise;
var should = chai.should();
var db = require('../models');
var sequelize = db.sequelize;
var Opportunity = sequelize.model('opportunity');
var SearchQuery = require('../lib/SearchQuery');
var searchQueryMock = require('./mocks/searchQuery');
//var searchResultMock = require('./mocks/searchResults');
var oppMock = require('./mocks/opportunity.js');

chai.use(chaiAsPromised);

var modelOverrideSet = [
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
];

function createOpportunity(overrides, done) {
  var body = oppMock(overrides);
  // We can depend on this because it's getting covered in another test.
  var instance = Opportunity.buildFromAdminForm(body);
  // NOW THIS IS HOW YOU DO PROMISES!
  return instance.validate().then(function(err) {
    if (err) throw(err);
      return instance.save();
  }).then(function(savedInstance) {
    // This section is probably not needed.
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
    var oppPromises = [];
    _.each(modelOverrideSet, function(overrides, index) {
      oppPromises.push(createOpportunity(overrides, done));
    });
    Promise.all(oppPromises).then(function() {
      return done();
    });
  });

  // TearDown.
  after(function(done) {
    var oppPromises = [];
    _.each(modelOverrideSet, function(overrides, index) {
      oppPromises.push(
	Opportunity.destroy({ title: overrides.title })
      );
    });
    Promise.all(oppPromises).then(function() {
      return done();
    });
  });

  describe('Return Structure', function() {
    var searchResult;
    before(function(done) {
      var body = new searchQueryMock({ gender: 'male' });
      var searchQuery = new SearchQuery(body);
      searchQuery.execute().success(function(result) {
        searchResult = result;
        console.log('----FORMATTED RESULT 2----');
        console.log(searchResult);
        return done();
      });
    });

    it('should set top keys to benefit types', function(done) {
      var topKeys = _.keys(searchResult);
      topKeys.should.include('incentive');
      topKeys.should.include('grant');
      topKeys.should.include('expertise');
      return done();
    });

    // TODO -- this test will be written when I"m properly setting the names.
    it('should place opportunities with multiple benefits in different top keys, multiple times', function(done) {
      searchResult.incentive.TESTOpportunityMatch.should.eql(searchResult.grant.TESTOpportunityMatch);
      return done();
    });

  });


  describe('Single to Single', function() {
    it('should find opportunities with matching gender, any or other when I search for male; and not find those without match.', function(done) {
      var searchResult;
      var body = new searchQueryMock({ gender: 'male' });
      var searchQuery = new SearchQuery(body);
      searchQuery.execute().success(function(result) {
        searchResult = result;
      });
      _.each(searchResult, function(element, index) {
        ['any', 'male', 'other'].should.contain(element.gender);
        element.gender.should.not.equal('female');
      });
      return done();
    });

    it('should find opportunities marked as any, other, male or female when I search for any', function(done) {
      var searchResult;
      var body = new searchQueryMock({ gender: 'any' });
      var searchQuery = new SearchQuery(body);
      searchQuery.execute().success(function(result) {
        searchResult = result;
      });
      _.each(searchResult, function(element, index) {
        ['any', 'male', 'other', 'female'].should.contain(element.gender);
      });
      return done();
    });
  });

  describe('Single to Multiple', function() {
    it('should find opportunity with matching purpose in set');
    it('should NOT find opportunity with no matching purpose');
    it('should find opportunities with OTHER purpose in set, no matter what purpose is picked')
    it('should find opportunities with anything purpose in set, no matter what purpose is picked')
  });

});
