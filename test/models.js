
var dotenv = require('dotenv');
dotenv.load();

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var should = chai.should();
var db = require('../models');
var sequelize = db.sequelize;
var opportunityMock = require('./mocks/opportunity.js');

chai.use(chaiAsPromised);

describe('Opportunity Model', function() {

  it('should create a new opportunity without optional fields', function(done) {
    var body = opportunityMock();
    var Opportunity = sequelize.model('opportunity');
    var instance = Opportunity.buildFromAdminForm(body);
    instance.validate().
    success(function(err) {
      if (err) {
        done(err);
      }
      instance.save().success(function(){
        done();
      })
      .error(function(err) {
        done(err);
      });
    });
  });

  it('should create a new opportunity with optional fields', function(done) {
    // purpose other is filled out, additionalGeneralInformation is filled out
    var body = opportunityMock({
      'purpose-other': 'A different purpose',
      additionalGeneralInformation: 'Some other general information'
    });
    var Opportunity = sequelize.model('opportunity');
    var instance = Opportunity.buildFromAdminForm(body);
    instance.validate().
    success(function(err) {
      if (err) {
        done(err);
      }
      instance.save().success(function(){
        done();
      })
      .error(function(err) {
        done(err);
      });
    });
  });

  it('should throw an error if a required field is missing', function(done) {
    // applicationCost is missing
    var body = opportunityMock({
      applicationCost: '',
    });
    var Opportunity = sequelize.model('opportunity');
    var instance = Opportunity.buildFromAdminForm(body);
    instance.validate().
    success(function(err) {
      if (err) {
        should.exist(err);
        done();
      }
    });
  });

  it('should correctly parse and save "other" text fields', function(done) {
    // purpose other is filled out, additionalGeneralInformation is filled out
    var body = opportunityMock({
      purpose: 'other',
      'purpose-other': 'A different purpose',
      additionalGeneralInformation: 'Some other general information'
    });

    var Opportunity = sequelize.model('opportunity');
    var instance = Opportunity.buildFromAdminForm(body);
    instance.validate().
    success(function(err) {
      if (err) {
        done(err);
      }
      instance.save().success(function(){
        Opportunity.find({where: {title: 'Test opp3'} }).success(function(op) {
          op.purpose.should.equal('_a_different_purpose');
          done();
        });
      })
      .error(function(err) {
        done(err);
      });
    });
  });

  it('should correctly save "other" checkbox fields', function(done) {
    // purpose other is filled out, additionalGeneralInformation is filled out
    var body = opportunityMock({
      eligibleIndustries: [ 'any', 'other', 'Otro Distinto' ]
    });
    var Opportunity = sequelize.model('opportunity');
    var instance = Opportunity.buildFromAdminForm(body);
    instance.validate().
    success(function(err) {
      if (err) {
        done(err);
      }
      instance.save().success(function(){
        Opportunity.find({where: {title: 'Test opp3'} }).success(function(op) {
          op.eligibleIndustries.should.include('Otro Distinto');
          done();
        });
      })
      .error(function(err) {
        done(err);
      });
    });
  });

  it('should fail to create two opportunities with the same title', function(done) {
    var body = opportunityMock();
    var Opportunity = sequelize.model('opportunity');
    var instance = Opportunity.buildFromAdminForm(body);
    instance.validate().
    success(function(err) {
      if (err) {
        done(err);
      }
      instance.save().success(function(){
          var instance2 = Opportunity.buildFromAdminForm(body);
          instance2.validate().success(function(err) {
            if (err)
              done (err);
            instance2.save().should.be.rejected.and.notify(done);
          });
      })
      .error(function(err) {
        done(err);
      });
    });
  });

  it('should create a new opportunity associated to a user by id', function(done) {
    var body = opportunityMock();
    var Opportunity = sequelize.model('opportunity');
    var instance = Opportunity.buildFromAdminForm(body);
    instance['user_id'] = 1
    instance.validate().
    success(function(err) {
      if (err) {
        done(err);
      }
      instance.save().success(function(){
        Opportunity.find({where: { 'user_id': 1 } }).success(function(entry) {
          done();
        });
        done(err);
      })
      .error(function(err) {
        done(err);
      });
    });
  });

  afterEach(function(done) {
    var Opportunity = sequelize.model('opportunity');
    Opportunity.destroy({title: 'Test opp3'}).success(function(rows) {
      done();
    });
  });
});
