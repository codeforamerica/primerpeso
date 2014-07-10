var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: $('body'), // attaches `this.el` to an existing element.
  events: {
    'click li.search-tab a': 'switchTab'
  },

  initialize: function(){
    _.bindAll(this, 'render', 'switchTab'); // fixes loss of context for 'this' within methods
    this.render(); // not all views are self-rendering. This one is.
  },

  render: function(){},

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
