module.exports = function(Backbone, _, SearchShop) {
  return Backbone.View.extend({
    el: '#shopping-cart',
    // Some other elements to cache
    //total : $('#total'),
    //basketTotal : $('#basket'),
    events: {
      'click .btn-submit': 'sendPrograms'
    },

    initialize : function(options) {
      // make a reference to the collection this view dances with
      _.bindAll(this, 'render', 'sendPrograms');
      this.collection = SearchShop.cartItems;
      this.$el.hide();

      // Initialize the popover
      $('#toggleCart').popover({
        title: 'Programas Elegidos',
        placement: 'bottom',
        animation: true,
        html: true,
        container: 'body',
        trigger: 'manual',
        content: function() {
          return $('#shopping-cart').html();
        },
        template: '<div class="popover cart-popover" role="tooltip"><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
      }).popover('show');
      // This is gross, but ok.
      // MAJOR HACK
      var theModel = this;
      $('#toggleCart').on('shown.bs.popover', function(){
        // Bind the callback to the button.
        $('.btn-send-programs').on('click', theModel.sendPrograms);
      })

      // execute default message for the shopping cart on init
      this.defaultMessage();

      // Listen for events ( add, remove or a change in quantity ) in the collection
      this.collection.on('add remove change:quantity', function( item ) {
        // Update the main total based on the new data
        //this.updateTotal();

        // If there is no items in the Cart
        if( this.collection.length === 0 ) {
          this.defaultMessage();
        }

      // Pass in this views context
      }, this);
    },

    defaultMessage : function() {
      // Give the view a class of empty, and inject new default content
      this.render();
      this.$el.addClass('empty').html(
        '<div class="row"><div class="col-md-12">Carrito vacío</div></div>');
    },

    remove: function( item ) {
      // Decrease the quantity by 1
      item.quanity('decrease');
      this.collection.remove( item );

      // Render the view
      this.render();
      $('#toggleCart').popover('show');
    },


    add : function( item ) {
      // Remove .empty class from the view
      this.$el.removeClass('empty');

      // Increase the quanity by 1
      item.quanity('increase');

      // Add the passed item model to the Cart collection
      // HACK - prevent adding dups.
      var exists = false;
      this.collection.each(function(collItem) {
        if (collItem.get('title') == item.get('title')) {
          exists = true;
        }
      });
      if (!exists) {
        this.collection.add( item );

        // Render the view
        this.render();
      }
      $('#toggleCart').popover('show');
    },

    sendPrograms: function(e) {
      this.collection.save().done(function() {
        window.location.href = "/results/picked/confirm";
        return false;
      });
    },

    render : function() {
      // Empty the view
      this.$el.html('');

      // Loop through the collection
      this.collection.each(function( item ) {

        // Render each item model into this List view
        var newItem = new SearchShop.View.ShoppingCartItemView({ model : item });
        this.$el.append( newItem.render().el );

      // Pass this list views context
      }, this);
      if (this.collection.length > 0) {
        this.$el.append('<div class="row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm btn-send-programs">Finalizar</button></div></div>');
      }
    }
  });
}
