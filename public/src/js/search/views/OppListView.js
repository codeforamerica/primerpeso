module.exports = Backbone.View.extend({
  el: $('body'), // attaches `this.el` to an existing element.

  events: {
  	'click a.addItem': 'addToCart',
    'click li.search-tab a': 'switchTab',
    'click #toggleCart': 'toggleCart'
  },

  initialize: function(){
    console.log('init opplist view.');
    _.bindAll(this, 'render', 'switchTab', 'addToCart', 'toggleCart'); // fixes loss of context for 'this' within methods
    this.render(); // not all views are self-rendering. This one is.
  },

  render: function(){
    console.log('render opplist view.');
    $('#toggleCart').popover({
      title: 'Selected Programs',
      placement: 'bottom',
      animation: true,
      content: function() {
        //return $('#shopping-cart').html();
      },
      html: true
    });
  },

  // TODO - review if this is the right placement.
  toggleCart: function(e) {
    $('#toggleCart').popover('show');
    return false;
  },
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