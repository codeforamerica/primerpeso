module.exports = function(Backbone, _, SearchShop) {
  return Backbone.View.extend({
    tagName: 'div',
    className: 'row',
    template: '<div class="col-md-12 cart-title"><%= title %></div>',
    events: {
      'click .name' : 'remove'
    },
    initialize: function() {
      this.render();
      // If this models contents change, we re-render
      this.model.on('change', function(){
        this.render();
      }, this);
    },
    render : function() {
      // Render this view and return its context.
      this.$el.html( _.template( this.template, this.model.toJSON() ));
      return this;
    },
    remove: function() {
      // Fade out item out from the shopping cart list
      this.$el.fadeOut(500, function(){
        // Remove it from the DOM on completetion
        $(this).remove();
      });
      // Remove the model for this view from the Shopping Cart Items collection
      SearchShop.cartItems.remove(this.model);
    }
  });
}
