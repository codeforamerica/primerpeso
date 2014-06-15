var App = require('../start');

var RootView = require('../views/root'),
  HomeView = require('../views/home');

/**
* Router
* @type {Backbone.Router}
*/
module.exports = Backbone.Router.extend({

  // If you are using queries param for a route, duplicate the master, see for home and home/:query
  routes: {
    '': 'root',
    'home': 'home',
    'home/:query': 'home',
    '*path': 'redirect404' // The last one, Always dude.
  },

  /**
   * Router init
   * It will create a new instance of each view and listen to transition between pages
   * @return {void}
   */
  initialize: function() {
    App.Views.Instances.root= new RootView();
    App.Views.Instances.home= new HomeView();
  },

  /**
   * Used before every action
   * If you come to the home page it will create a new session
   * It also clean your app's timeouts
   * @return {void}
   */
  before: function(page, query) {},

  /**
   * Used after every action
   * It will create a stat per page for you and also inform the native that we open dat page
   * @return {void}
   */
  after: function after(page,query) {
    // Prepare your query to be logged
    query = (!query) ? '' : '/' + query;
    console.debug("[Router@after] : Open page - " + page + query);
  },

  root: function root(query) {
    this.before('root');
    App.Views.Instances.root.render();
    this.after('root', query);
  },

  home: function home(query) {
    this.before('home');
    App.Views.Instances.home.render();
    this.after('home', query);
  },

  //=route=//

  /**
   * Used when a page isn't found
   * @return {void}
   */
  redirect404: function() {
    console.log('Oops, 404!');
  }

});