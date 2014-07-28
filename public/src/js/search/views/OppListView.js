module.exports = function(Backbone, _, SearchShop) {
  return Backbone.View.extend({
    el: $('body'), // attaches `this.el` to an existing element.

    events: {
      'click a.addItem': 'addToCart',
      'click li.search-tab a': 'switchTab',
      'click #toggleCart': 'toggleCartPopover'
    },

    initialize: function(){
      // fixes loss of context for 'this' within methods.
      _.bindAll(this, 'render', 'switchTab', 'addToCart', 'toggleCartPopover');
      this.render(); // not all views are self-rendering. This one is.
    },

    render: function(){
      console.log('render opplist view.');
      /*console.log('FAKE ADD CART ITEM');
      var oppInstance = new SearchShop.Model.OppModel({
        title: 'Monkey',
      });*/
      //SearchShop.cart.add(oppInstance);
    },

    // TODO - review if this is the right placement.
    toggleCartPopover: function(e) {
      $('#toggleCart').popover('toggle');
      return false;
    },

    addToCart: function(e) {
      // TODO HACK -- instantiate the model
      var oppInstance = new SearchShop.Model.OppModel({
        benefitName: $(e.currentTarget).data('bname'),
        benefitType: $(e.currentTarget).data('btype')
      });
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
}