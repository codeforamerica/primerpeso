exports = module.exports = function(overrides) {
  var body = {
    //"purpose": "Other",
    //"eligibleBusinessLocation": "anywhere_in_pr",
    //"eligibleBusinessLocation-other": "",
    //"minimumYearsInBusiness": "0",
    //"eligibleEntityTypes": "non_profit",
    //"currentEmployeesRequired": "26_50",
    //"annualRevenue": "0_99999",
    /*"eligibleIndustries": [
      "any",
    ],*/
    "gender": "any",
    "age": "0"
    //"moneyInvested": ""
  }
  if (overrides) {
    for (var key in overrides) {
      body[key] = overrides[key];
    }
  };
  return body;
}
