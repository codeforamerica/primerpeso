exports = module.exports = function(overrides) {
  var body = {
    "_csrf": "undefined",
    "_doc_id": "",
    "title": "Test opp3",
    "purpose": ["Other"],
    "purposeOther": "",
    "eligibleBusinessLocation": ["anywhere_in_pr"],
    "eligibleBusinessLocationOther": "",
    "paperworkRequired": ["asdfasd"],
    "applicationCost": "23",
    "applicationDeadline": "2014-12-31",
    "avgApplicationTime": "90 days",
    "benefitType": ["incentive"],
    "benefitTypeOther": "",
    "benefitDescription": "Una descripcion",
    "agencyName": "Una gencia",
    "agencyContactName": "Un contacto",
    "agencyContactEmail": "unemail",
    "agencyContactPhone": "7875663317",
    "minimumYearsInBusiness": "0",
    "eligibleEntityTypes": ["non_profit"],
    "currentEmployeesRequired": ["26_50"],
    "annualRevenue": ["0_99999"],
    "eligibleIndustries": [ "any" ],
    "gender": "any",
    "age": ["0"],
    "additionalGeneralInformation": "",
    "moneyInvested": ""
  }
  if (overrides) {
    for (var key in overrides) {
      body[key] = overrides[key];
    }
  };
  return body;
}