var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: $('body'), // attaches `this.el` to an existing element.
  events: {
    'click li.search-tab a': 'showOther'
  },

  initialize: function(){
    _.bindAll(this, 'render', 'showOther'); // fixes loss of context for 'this' within methods
    this.render(); // not all views are self-rendering. This one is.
  },

  render: function(){
    $('select').select2();
  },

  switchTab: function(e) {
  }
});
