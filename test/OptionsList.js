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

    // Test Array.
    var ageChoices = optList.getFormChoices('age');
    var ageChoicesControl = ['Any', '16-25', '26-40', '41-64', '65+'];
    var ageChoicesControl = _.zipObject(_.keys(ageChoicesControl), ageChoicesControl);
    ageChoices.should.eql(ageChoicesControl);
    return done();
  });

  it('Should return filtered options when fundMeWizard form name is passed', function(done) {
    // Test Object.
    var optList = new OptionsList('fundMeWizard');
    var genderChoices = optList.getFormChoices('gender');
    var genderChoicesControl = { any: 'Both - if multiple owners, male: 'Male', female: 'Female'};
    genderChoices.should.eql(genderChoicesControl);

    // Test Array.
    var ageChoices = optList.getFormChoices('age');
    var ageChoicesControl = ['Any', '16-25', '26-40', '41-64', '65+'];
    var ageChoicesControl = _.zipObject(_.keys(ageChoicesControl), ageChoicesControl);
    // Delete to simulate override.
    delete ageChoicesControl['0'];
    ageChoices.should.eql(ageChoicesControl);
    return done();
  });
});
