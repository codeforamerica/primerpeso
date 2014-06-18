var App = require('../start');

/**
* Our Master view View
* @type {Backbone.View}
*/

var MasterView = Backbone.View.extend({

  el: "#wrapper",
  bodyClass: "",
  template: "",

  /**
   * Matser events:
   *     - Open page from a custom target
   * These events are triggered after a view's events
   * @type {Object}
   */
  events: {
    'click [data-page-dest]' : "getPageTarget",
    "click .btn-i18n" : "i18nSwitch"
  },

  /**
   * Custom constructor for a Class
   */
  init: function init() {},

  /**
   * Create a context for your view
   * Override this method to remove the extend of events
   * @return {void}
   */
  initialize: function initialize() {
    // Extends your view's events, so yours will be triggered before Master's
    this.events = _.extend({},this.events, MasterView.prototype.events);

    this.init();
  },

  // Hook before we render the view
  beforeRender: function beforeRender() {},

  // Hook after we have rendered
  afterRender: function afterRender() {},

  /**
   * Render the view
   * You can bind a custom context by adding one inside the before hook
   * @return {Backbone.View}
   */
  render: function render() {

    // Find a custom context for your view
    var context = _.extend({},/*App.currentLang(),*/this.beforeRender() || {});

    //console.log("[AbstractView@render] : Bind context to the view - " + Backbone.history.fragment + " at #" + this.el.id,context);

    this.toggleClassName();

    // Let me explain why there is a off() :
    // If we have N views, the click on a [data-page-target] will be triggered,
    // as many views we have. Because we attach events for each view.
    //
    // To prevent this, we kill events, and we will run again events after we draw the view
    this.$el.removeClass()
      .off()
      //.html(this.template(context))
      .html(this.template)
      .addClass(this.className || '');

    this.afterRender();

    // There it is, we bind events to the view.
    this.delegateEvents();

    return this;
  },

  /**
   * Input values changed
   * @param {type} evt
   */
  changed: function changed(evt) {
    window.resetTimeout();
    // We get the name of input and the value and we store it in the form
    this.model.set(evt.currentTarget.name, encodeURIComponent(evt.currentTarget.value || ''));
  },


  /**
   * Toggle your view's className to the body
   * @return {void}
   */
  toggleClassName : function toggleClassName() {

    if(!this.bodyClass) {
      return;
    }

    // Return an array of classNames begining with page-
    var current = document.body.className.match(/page-.\w*-?\w*/g);
    if(current) {
      current.map(function (item) {
        document.body.classList.remove(item);
      });
    }

    this.bodyClass && document.body.classList.add(this.bodyClass);
  },

  /**
   * This method is called on each click on a button.
   * It will look for an attribute :
   *     - data-page-dest : It's a page's name
   * So it will auto open this page.
   * It will log an error to the driver if the page's name does not match a route.
   * @param  {Object} e Event click
   * @return {void}
   */
  getPageTarget : function getPageTarget(e) {

    var routes = App.Routers.Instances.router.routes,
      page   = e.currentTarget.getAttribute("data-page-dest");

    console.debug("[MasterView@getPageTarget] : Open the page - " + page);

    if(page) {

      // Because page is always an empty string
      if('root' === page) {
        page = "";
      }

      if(routes.hasOwnProperty(page)) {
        return window.openPage(page);
      }
      console.error("Something is wrong with your route's name, it does'nt match any of our routes  --  " + page || 'root');
    }
   },

  /**
   * Allow you to change the language of your application.
   * It will look for a button with a class .btn-i18n associate with an attribute data-i18n
   * @param  {Event} e click event
   * @return {void}
   */
  i18nSwitch : function i18nSwitch(e) {
    App.Languages.current = e.currentTarget.dataset.i18n.trim();
    document.documentElement.lang = e.currentTarget.dataset.i18n.trim();

    this.render();
   }
});

module.exports = MasterView;
