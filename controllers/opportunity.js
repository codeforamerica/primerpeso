var Opp = require('../models/Opportunity');
var reqMuncher = require('../helpers/reqMuncher');

module.exports = function(app) {
  // Hijack the request for testing purposes.
  if(app.get('env') == 'development') {
    app.use('/opportunity/create', reqMuncher.munchOppRequest);
  }
  app.post('/opportunity/create', oppCreate);
}


var oppCreate = function(req, res, next) {

  // Create A Stub Opportunity
  var opp = new Opp({
    name: req.body.name,
    description: req.body.description
  });

  // Save it and let the model middlware populate what we don't know.
  opp.save(function(err, savedOpp) {
    if (err) {
      console.log(err);
      return res.json(503, err.message);
    }
    return res.json(savedOpp);
  });
};




