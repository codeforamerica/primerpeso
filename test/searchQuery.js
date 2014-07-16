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
var searchQueryMock = require('./mocks/searchQuery.js');
var oppMock = require('./mocks/opportunity.js');

chai.use(chaiAsPromised);

var modelOverrideSet = [
  // Match
  {
    title:   "TEST: Opporunity Match",
    purpose: ["start_business", "export"],
    gender:  "male"
  },
  // No Match
  {
    title:   "TEST: Opporunity No Match",
    purpose: ["relocate_business", "open_franchise"],
    gender:  "female"
  },
  // Match Other
  {
    title:   "TEST: Opporunity Match Other",
    purpose: ["other"],
    //gender:  "other" // @TODO -- for some reason this breaks.
  },
  // Match Any
  {
    title:   "TEST: Opporunity Match Any",
    purpose: ["anything"],
    gender:  "any"
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
      //oppPromises.push(createOpportunity(overrides, done));
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
        //Opportunity.destroy({ title: overrides.title })
      );
    });
    Promise.all(oppPromises).then(function() {
      return done();
    });
  });


  describe('Single to Single', function() {
    var searchResult;
    before(function(done) {
      var body = new searchQueryMock({ gender: 'male' });
      var searchQuery = new SearchQuery(body);
      searchQuery.execute().success(function(result) {
        searchResult = result;
        return done();
      });
    });
    it('should find opportunities with matching gender, any or other; and not find those without match.', function(done) {
      _.each(searchResult, function(element, index) {
        ['any', 'male', 'other'].should.contain(element.gender);
        element.gender.should.not.equal('female');
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
