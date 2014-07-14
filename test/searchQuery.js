var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var should = chai.should();
var db = require('../models');
var sequelize = db.sequelize;
var searchQueryMock = require('./mocks/searchQuery.js');
var oppMock = require('./mocks/opportunity.js');

chai.use(chaiAsPromised);

describe('Search Query', function() {

});
