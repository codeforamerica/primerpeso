exports = module.exports = function(overrides) {
  var body = {
    "purpose": "start_business",
    //"eligibleBusinessLocation": "anywhere_in_pr",
    //"eligibleBusinessLocationOther": "",
    //"minimumYearsInBusiness": "0",
    //"eligibleEntityTypes": "non_profit",
    //"currentEmployeesRequired": "26_50",
    //"annualRevenue": "0_99999",
    /*"eligibleIndustries": [
      "any",
    ],*/
    //"gender": "male",
    //"age": "2",
    //"investingOwnMoney": true
    //"moneyInvested": ""
  }
  if (overrides) {
    for (var key in overrides) {
      body[key] = overrides[key];
    }
  };
  return body;
}
