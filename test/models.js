var dotenv = require('dotenv');
dotenv.load();

var chai = require('chai');
var should = chai.should();
var db = require('../models');
var sequelize = db.sequelize;

describe('Opportunity Model', function() {

  var body = { _csrf: 'undefined', _doc_id: '', title: 'Test opp3', purpose: 'anything', 'purpose-other': '', eligibleBusinessLocation: 'anywhere_in_pr', 'eligibleBusinessLocation-other': '', paperworkRequired: 'asdfasd', applicationCost: '23', applicationDeadline: '2014-12-31', avgApplicationTime: '90 days', benefitType: 'incentive', 'benefitType-other': '', benefitDescription: 'Una descripcion', agencyName: 'Una gencia', agencyContactName: 'Un contacto', agencyContactEmail: 'unemail', agencyContactPhone: '7875663317', minimumYearsInBusiness: '0', eligibleEntityTypes: 'non_profit', currentEmployeesRequired: '26_50', annualRevenue: '0_99999', eligibleIndustries: [ 'any', '' ], gender: 'any', age: '0', additionalGeneralInformation: '', moneyInvested: '' }

  it('should create a new opportunity without optional fields', function(done) {
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

  

  after(function(done) {
    var Opportunity = sequelize.model('opportunity');
    Opportunity.destroy({title: 'Test opp3'}).success(function(rows) {
      done();
    });
  });
});


//var User = require('../models/User');

/*describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) return done(err);
      done();
    })
  });

  it('should not create a user with the unique email', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });

  it('should find user by email', function(done) {
    User.findOne({ email: 'test@gmail.com' }, function(err, user) {
      if (err) return done(err);
      user.email.should.equal('test@gmail.com');
      done();
    });
  });

  it('should delete a user', function(done) {
    User.remove({ email: 'test@gmail.com' }, function(err) {
      if (err) return done(err);
      done();
    });
  });
});*/
