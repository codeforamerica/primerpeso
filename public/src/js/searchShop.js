var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');

Backbone.$ = $;

var SearchShop = {
  Collection: {},
  Model: {},
  View: {}
};

SearchShop.Model.Opp = Backbone.Model.extend({
  defaults: {
    title: '',
  },
  // Increase or decrease the quantity
	quanity : function( type ) {
		var qty = this.get('quantity');
		this.set('quantity', (type === 'increase' ? ++qty : --qty) );
	}
});

SearchShop.Collection.Opps = Backbone.Collection.extend({
  models: SearchShop.Model.Item
});

// TODO -- this will need a split into two views - one for the tabs, one for the lists.
SearchShop.View.OppList = Backbone.View.extend({
  el: $('body'), // attaches `this.el` to an existing element.
  events: {
  	'click a.addItem': 'addToCart',
    'click li.search-tab a': 'switchTab'
  },

  initialize: function(){
    _.bindAll(this, 'render', 'switchTab'); // fixes loss of context for 'this' within methods
    this.render(); // not all views are self-rendering. This one is.
  },

  render: function(){},
  addToCart: function(e) {
  	// TODO HACK -- instantiate the model LOL.
  	var target = e.currentTarget;
    var modelData = {};
  	modelData.title = $(target).data('title');
  	var oppInstance = new SearchShop.Model.Opp(modelData);
    SearchShop.cart.add(oppInstance);
    return false;
  },
  switchTab: function(e) {
    var targetId = $(e.currentTarget).attr('id');
    $('.search-tabs .active').removeClass('active');
    $(e.currentTarget).parent().addClass('active');
    if (targetId == 'all') {
      $('.opportunities-container').children().each(function(index, element){
        $(element).show();
      });
    }
    else {
      $('.opportunities-container').children().each(function(index, element){
        $(element).hide()
      });
      $('.' + targetId + '-container').show();
    }
  }
});

SearchShop.View.ShoppingCartItemView = Backbone.View.extend({
  tagName: 'tr',
  template: '<td class="name"><%= title %></td>',
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

// View for the Shopping Cart, container for individual Shopping Cart Item Views
SearchShop.View.ShoppingCart = Backbone.View.extend({
	el: '#shopping-cart',

	// Some other elements to cache
	total : $('#total'),
	basketTotal : $('#basket'),

	initialize : function(){
		// make a reference to the collection this view dances with
		this.collection = SearchShop.cartItems;

		// execute default message for the shopping cart on init
		this.defaultMessage();

		// Listen for events ( add, remove or a change in quantity ) in the collection
		this.collection.on('add remove change:quantity', function( item ){

			// Update the main total based on the new data
			this.updateTotal();

			// If there is no items in the Cart
			if( this.collection.length === 0 ) {
				this.defaultMessage();
			}

		// Pass in this views context
		}, this);
	},

	defaultMessage : function() {
		// Give the view a class of empty, and inject new default content
		this.$el.addClass('empty').html('<tr><td colspan="4">Cart is empty</td></tr>');
	},

	add : function( item ) {
		// Remove .empty class from the view
		this.$el.removeClass('empty');

		// Increase the quanity by 1
		item.quanity('increase');

		// Add the passed item model to the Cart collection
		this.collection.add( item );

		// Render the view
		this.render();
	},

	// Update the totals in the cart
	updateTotal : function() {
		// This is the var for the counter at the top of the page
		var basketTotal = this.collection.length;

		// Inject these totals
		this.basketTotal.html( basketTotal );
	},

	render : function(){
		// Empty the view
		this.$el.html('');

		// Loop through the collection
		this.collection.each(function( item ){

			// Render each item model into this List view
			var newItem = new SearchShop.View.ShoppingCartItemView({ model : item });
			this.$el.append( newItem.render().el );

		// Pass this list views context
		}, this);
	}
});

//SearchShop.items = new SearchShop.Collection.Items();
SearchShop.cartItems = new SearchShop.Collection.Opps();

// Execute when a model is added to the cart Items collection
SearchShop.cartItems.on('add', function( item ){
	// Make sure this models quantity is set to 1 on adding
	item.set('quantity',1);
});

// Setup our models and add all to a collection
/*for( var i in defaultItems ) {
	SearchShop.items.add( new SearchShop.Model.Item(defaultItems[i]) );
}*/

// Define our shopping cart
SearchShop.cart = new SearchShop.View.ShoppingCart();


module.exports = SearchShop;
