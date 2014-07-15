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
var searchQueryMock = require('./mocks/searchQuery.js');
var oppMock = require('./mocks/opportunity.js');

chai.use(chaiAsPromised);

var overrideSet = [
  // Match
  {
    title:   "Opporunity Match",
    purpose: ["start_business", "export"]
    //applicationCost: 'string'
  },
  // No Match
  {
    title:   "Opporunity No Match",
    purpose: ["relocate_business", "open_franchise"]
  },
  // Match Other
  {
    title:   "Opporunity Match Other",
    purpose: ["other"]
  },
  // Match Any
  {
    title:   "Opporunity Match Any",
    purpose: ["anything"]
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
  before(function(done) {
    // Initialize and save opportunity mocks to run searches against.
    var oppPromises = [];
    _.each(overrideSet, function(overrides, index) {
      oppPromises.push(createOpportunity(overrides, done));
    });
    Promise.all(oppPromises).then(function() {
      return done();
    });
  });
  after(function(done) {
    var oppPromises = [];
    _.each(overrideSet, function(overrides, index) {
      oppPromises.push(
        Opportunity.destroy({ title: overrides.title })
      );
    });
    Promise.all(oppPromises).then(function() {
      return done();
    });
  });


  it('should find opportunity with matching purpose in set');
  /*it('should NOT find opportunity with no matching purpose');
  it('should find opportunities with OTHER purpose in set, no matter what purpose is picked')
  it('should find opportunities with anything purpose in set, no matter what purpose is picked')*/
});
