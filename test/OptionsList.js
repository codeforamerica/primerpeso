var S = require('string');
var _ = require('lodash');
var OptionsList = require('../lib/OptionsList');

describe('Options List', function() {
  it('Should return full options when no form name is passed', function(done) {
    // Test Object.
    var optList = new OptionsList();
    var genderChoices = optList.getFormChoices('gender');
    var genderChoicesControl = { any: 'Cualquier', male: 'Hombre', female: 'Mujer', other_gender: 'Otro' };
    genderChoices.should.eql(genderChoicesControl);

    // Test Array.
    var ageChoices = optList.getFormChoices('age');
    var ageChoicesControl = ['Cualquier', '16-25', '26-40', '41-64', '65+'];
    var ageChoicesControl = _.zipObject(_.keys(ageChoicesControl), ageChoicesControl);
    ageChoices.should.eql(ageChoicesControl);
    return done();
  });

  it('Should return filtered options when fundMeWizard form name is passed', function(done) {
    // Test Object.
    var optList = new OptionsList('fundMeWizard');
    var genderChoices = optList.getFormChoices('gender');
    var genderChoicesControl = { any: 'Ambos - si propietarios de ambos géneros', male: 'Hombre', female: 'Mujer'};
    genderChoices.should.eql(genderChoicesControl);

    // Test Array.
    var ageChoices = optList.getFormChoices('age');
    var ageChoicesControl = ['Cualquier', '16-25', '26-40', '41-64', '65+'];
    var ageChoicesControl = _.zipObject(_.keys(ageChoicesControl), ageChoicesControl);
    // Delete to simulate override.
    delete ageChoicesControl['0'];
    ageChoices.should.eql(ageChoicesControl);
    return done();
  });
});
