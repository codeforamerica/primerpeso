module.exports = function (Backbone, _, SearchShop) {
  return Backbone.Model.extend({
    defaults: {
      benefitName: '',
      benefitType: ''
    },
    initialize: function() {
      var properties = this.getPropertiesFromResult();
      this.set(properties);
    },
    getPropertiesFromResult: function() {
      var benefitName = this.get('benefitName');
      var benefitType = this.get('benefitType');
      // Build from JSON.
      // Embedded in page.
      // Be a bit defensive.
      var properties = {};
      if (searchResult[benefitType]) {
        if (searchResult[benefitType][benefitName])
          properties = searchResult[benefitType][benefitName];
      }
      return properties;
      // TODO -- neds work.
      //if (properties === {})
      //  return alert('Sorry -- Having a Problem');
    },
    // Increase or decrease the quantity
    quanity : function( type ) {
      var qty = this.get('quantity');
      this.set('quantity', (type === 'increase' ? ++qty : --qty) );
    }
  });
}