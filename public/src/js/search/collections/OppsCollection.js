module.exports = function(Backbone, _, SearchShop) {
  return Backbone.Collection.extend({
    models: SearchShop.Model.OppModel,
    save: function() {
      // TODO -- WTF -> Why can't I call this.toJSON()???
      var payload = JSON.stringify(this);
      return $.ajax({
        method: 'POST',
        url: '/results/pick',
        contentType: 'application/json',
        dataType: 'json',
        data: payload
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      });
    }
  });
};
