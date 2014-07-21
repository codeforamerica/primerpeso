module.exports = function(Backbone, _, SearchShop) {
  return Backbone.Collection.extend({
    models: SearchShop.Model.OppModel
  });
};