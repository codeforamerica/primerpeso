var Backbone = require('backbone');
var _ = require('lodash');

Backbone.$ = $;

var SearchShop = {
  Collection: {},
  Model: {},
  View: {}
};

SearchShop.Model.OppModel = require('./models/OppModel');
SearchShop.Collection.OppsCollection = require('./collections/OppsCollection');

// TODO -- this will need a split into two views - one for the tabs, one for the lists.
SearchShop.View.OppListView = require('./views/OppListView');
SearchShop.View.ShoppingCartItemView = require('./views/ShoppingCartItemView');

SearchShop.View.PopoverView = require('./views/PopoverView');

// View for the Shopping Cart, container for individual Shopping Cart Item Views
SearchShop.View.ShoppingCartView = require('./views/ShoppingCartView');


//SearchShop.items = new SearchShop.Collection.Items();
SearchShop.cartItems = new SearchShop.Collection.OppsCollection();

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
SearchShop.cart = new SearchShop.View.ShoppingCartView();


module.exports = SearchShop;
