var MasterView = require('./masterView');

/**
* Home page view (page 2)
* @type {Backbone.View}
*/
module.exports = MasterView.extend({

//  template: tpl('home'),
  template: '<h1> hellow </h1>',

  events: {
    "click .btn-action-x" : "button"
  },

  button : function button(){
    console.log("This event is called  before we swicth to another page");
  }

});
