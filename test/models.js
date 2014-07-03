var dotenv = require('dotenv');
dotenv.load();

var chai = require('chai');
var should = chai.should();
var db = require('../models');
var sequelize = db.sequelize;

describe('Opportunity Model', function() {

  it('should create a new opportunity without optional fields', function(done) {
    var body = { _csrf: 'undefined', _doc_id: '', title: 'Test opp3', purpose: 'anything', 'purpose-other': '', eligibleBusinessLocation: 'anywhere_in_pr', 'eligibleBusinessLocation-other': '', paperworkRequired: 'asdfasd', applicationCost: '23', applicationDeadline: '2014-12-31', avgApplicationTime: '90 days', benefitType: 'incentive', 'benefitType-other': '', benefitDescription: 'Una descripcion', agencyName: 'Una gencia', agencyContactName: 'Un contacto', agencyContactEmail: 'unemail', agencyContactPhone: '7875663317', minimumYearsInBusiness: '0', eligibleEntityTypes: 'non_profit', currentEmployeesRequired: '26_50', annualRevenue: '0_99999', eligibleIndustries: [ 'any', '' ], gender: 'any', age: '0', additionalGeneralInformation: '', moneyInvested: '' }
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
    var body = { _csrf: 'undefined', _doc_id: '', title: 'Test opp3', purpose: 'Other', 'purpose-other': 'A different purpose', eligibleBusinessLocation: 'anywhere_in_pr', 'eligibleBusinessLocation-other': '', paperworkRequired: 'asdfasd', applicationCost: '23', applicationDeadline: '2014-12-31', avgApplicationTime: '90 days', benefitType: 'incentive', 'benefitType-other': '', benefitDescription: 'Una descripcion', agencyName: 'Una gencia', agencyContactName: 'Un contacto', agencyContactEmail: 'unemail', agencyContactPhone: '7875663317', minimumYearsInBusiness: '0', eligibleEntityTypes: 'non_profit', currentEmployeesRequired: '26_50', annualRevenue: '0_99999', eligibleIndustries: [ 'any', '' ], gender: 'any', age: '0', additionalGeneralInformation: 'Some other general information', moneyInvested: '' }
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
    var body = { _csrf: 'undefined', _doc_id: '', title: 'Test opp3', purpose: 'Other', 'purpose-other': 'A different purpose', eligibleBusinessLocation: 'anywhere_in_pr', 'eligibleBusinessLocation-other': '', paperworkRequired: 'asdfasd', applicationCost: '', applicationDeadline: '2014-12-31', avgApplicationTime: '90 days', benefitType: 'incentive', 'benefitType-other': '', benefitDescription: 'Una descripcion', agencyName: 'Una gencia', agencyContactName: 'Un contacto', agencyContactEmail: 'unemail', agencyContactPhone: '7875663317', minimumYearsInBusiness: '0', eligibleEntityTypes: 'non_profit', currentEmployeesRequired: '26_50', annualRevenue: '0_99999', eligibleIndustries: [ 'any', '' ], gender: 'any', age: '0', additionalGeneralInformation: 'Some other general information', moneyInvested: '' }
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
    var body = { _csrf: 'undefined', _doc_id: '', title: 'Test opp3', purpose: 'other', 'purpose-other': 'A different purpose', eligibleBusinessLocation: 'anywhere_in_pr', 'eligibleBusinessLocation-other': '', paperworkRequired: 'asdfasd', applicationCost: '23', applicationDeadline: '2014-12-31', avgApplicationTime: '90 days', benefitType: 'incentive', 'benefitType-other': '', benefitDescription: 'Una descripcion', agencyName: 'Una gencia', agencyContactName: 'Un contacto', agencyContactEmail: 'unemail', agencyContactPhone: '7875663317', minimumYearsInBusiness: '0', eligibleEntityTypes: 'non_profit', currentEmployeesRequired: '26_50', annualRevenue: '0_99999', eligibleIndustries: [ 'any', ], gender: 'any', age: '0', additionalGeneralInformation: 'Some other general information', moneyInvested: '' }
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
    var body = { _csrf: 'undefined', _doc_id: '', title: 'Test opp3', purpose: 'other', 'purpose-other': 'A different purpose', eligibleBusinessLocation: 'anywhere_in_pr', 'eligibleBusinessLocation-other': '', paperworkRequired: 'asdfasd', applicationCost: '23', applicationDeadline: '2014-12-31', avgApplicationTime: '90 days', benefitType: 'incentive', 'benefitType-other': '', benefitDescription: 'Una descripcion', agencyName: 'Una gencia', agencyContactName: 'Un contacto', agencyContactEmail: 'unemail', agencyContactPhone: '7875663317', minimumYearsInBusiness: '0', eligibleEntityTypes: 'non_profit', currentEmployeesRequired: '26_50', annualRevenue: '0_99999', eligibleIndustries: [ 'any', 'other', 'Otro Distinto' ], gender: 'any', age: '0', additionalGeneralInformation: 'Some other general information', moneyInvested: '' }
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

  afterEach(function(done) {
    var Opportunity = sequelize.model('opportunity');
    Opportunity.destroy({title: 'Test opp3'}).success(function(rows) {
      done();
    });
  });
});
