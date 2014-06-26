var _ = require('lodash');
var S = require('string');
var chai = require('chai');
var should = chai.should();

describe('Admin Controller', function() {
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


