var _ = require('lodash');

exports = module.exports = function(overrides) {
  var overrides = overrides || {};
  var body = {
    "selectedPrograms": [
      {
        "benefitName": 9,
        "benefitType": [
          "incentive"
        ],
        "id": 9,
        "title": "Incentivos contributivos",
        "purpose": [
          "open_location",
          "export",
          "keep_employees",
          "relocate_business"
        ],
        "eligibleBusinessLocation": [
          "caguas"
        ],
        "paperworkRequired": [
          "To attract and retain new companies already established in the city.",
          "Please contact office for requirements"
        ],
        "applicationCost": 200,
        "applicationDeadline": "2017-01-30T00:00:00.000Z",
        "avgApplicationTime": "30 days",
        "benefitDescription": "The new Incentives Code provides fiscal benefits for activities developed in specific areas such as the special development zone of the Traditional Urban Center and the Special Development Corridors, among others which due to their potential for growth and their impact on the economy as a whole are considered a priority. In addition, it provides benefits to more than 21 types of eligible units or businesses.\r\n",
        "agencyId": 1,
        "agencyContactName": "Zamia Baerga",
        "agencyContactEmail": "zamia.baerga@caguas.gov.pr",
        "agencyContactPhone": "7876538833",
        "minimumYearsInBusiness": 0,
        "eligibleEntityTypes": [
          "any"
        ],
        "currentEmployeesRequired": [
          "any"
        ],
        "annualRevenue": [
          "any"
        ],
        "eligibleIndustries": [
          "11",
          "42",
          "51",
          "54",
          "56",
          "61",
          "62",
          "48-49",
          "other"
        ],
        "gender": "any",
        "age": [
          0
        ],
        "additionalDemographics": [
          "any"
        ],
        "additionalGeneralInformation": "Disqualifying factors: companies already established in the city that are not planning to grow.  ",
        "investingOwnMoney": "false",
        "moneyInvested": "",
        "creatorId": 8,
        "createdAt": "2014-07-02T18:42:16.317Z",
        "updatedAt": "2014-09-11T22:00:42.098Z",
        "agency": {
          "id": 1,
          "name": "Secretaria de Desarrollo Econ\u00f3mico de Caguas",
          "mission": null,
          "phone": null,
          "fax": null,
          "email": null,
          "address": null,
          "municipality": null,
          "state": null,
          "zip": null,
          "web": null,
          "creatorId": 1,
          "createdAt": "2014-09-10T16:37:30.288Z",
          "updatedAt": "2014-09-10T16:37:30.288Z"
        },
        "requirements": [

        ],
        "quantity": 1
      }
    ],
    "query": {
      "gender": "any",
      "age": "1",
      "purpose": "relocate_business",
      "purposeOther": "",
      "investingOwnMoney": "1",
      "moneyInvested": "33",
      "businessType": "for_profit",
      "industry": "accommodation",
      "businessLocation": "anywhere_in_pr",
      "employeeNumber": "6_25",
      "yearsInBusiness": "3",
      "annualRevenue": "100000_499999"
    },
    "submitter": {
      "_csrf": "d1Nt1YAoQplkiC4LBdEhi9hgc6VuK0xwd7pmI=",
      "name": "Maksim Pecherskiy",
      "phone": "17736777755",
      "email": "maxp37@maxp37.com",
      "address": "1134 Wildberry Ct",
      "municipality": "Wheeling",
      "state": "IL",
      "zip": "60090",
      "areYouInc": "1",
      "legalCompanyName": "Maksimize",
      "bizAddress": "3614 N. Ashland Suite 2",
      "bizMunicipality": "Chicago",
      "bizState": "IL",
      "bizZip": "60613"
    }
  };

  return _.extend(body, overrides);
}
