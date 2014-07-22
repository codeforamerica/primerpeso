var Backbone = require('backbone');
var _ = require('lodash');

Backbone.$ = $;

var SearchShop = {
  Collection: {},
  Model: {},
  View: {}
};

// TODO -- fix this mess.
SearchShop.Model.OppModel = require('./search/models/OppModel')(Backbone, _, SearchShop);
SearchShop.Collection.OppsCollection = require('./search/collections/OppsCollection')(Backbone, _, SearchShop);

// TODO -- this will need a split into two views - one for the tabs, one for the lists.
SearchShop.View.OppListView = require('./search/views/OppListView')(Backbone, _, SearchShop);
SearchShop.View.ShoppingCartItemView = require('./search/views/ShoppingCartItemView')(Backbone, _, SearchShop);

// View for the Shopping Cart, container for individual Shopping Cart Item Views
SearchShop.View.ShoppingCartView = require('./search/views/ShoppingCartView')(Backbone, _, SearchShop);


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
