var S = require('string');
var _ = require('lodash');
var OptionsList = require('../lib/OptionsList');

describe('Options List', function() {
  it('Should return full options when no form name is passed', function(done) {
    // Test Object.
    var optList = new OptionsList();
    var genderChoices = optList.getFormChoices('gender');
    var genderChoicesControl = { any: 'Any', male: 'Male', female: 'Female', other: 'Other' };
    genderChoices.should.eql(genderChoicesControl);
    return done();
    // TODO Test Array.
  });

  it('Should return filtered options when fundMeWizard form name is passed', function(done) {
    // Test Object.
    var optList = new OptionsList('fundMeWizard');
    var genderChoices = optList.getFormChoices('gender');
    var genderChoicesControl = { any: 'Both', male: 'Male', female: 'Female'};
    genderChoices.should.eql(genderChoicesControl);
    return done();
    // TODO Test Array.
  });
});
