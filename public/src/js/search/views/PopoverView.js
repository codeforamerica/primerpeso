module.exports = function(Backbone, _, SearchShop) {
  return Backbone.View.extend({
    initialize: function (options) {
      _.bindAll(this, "render", "setContent", "show", "hide", "toggle", "destroy", "remove");

      this.offsetTop = 30;
      this.offsetLeft = 0;

      if (options && options.header)
        this.Header = options.header;
      if (options && options.content)
        this.Content = options.content;
      if (options && options.placement)
        this.Placement = options.placement;
      if (options && options.trigger)
        this.Trigger = options.trigger;
      if (options && options.delay)
        this.Delay = options.delay;
      if (options && options.offsetTop && $.isNumeric(options.offsetTop))
        this.offsetTop += options.offsetTop;
      if (options && options.offsetLeft && $.isNumeric(options.offsetLeft))
        this.offsetLeft += options.offsetLeft;
    },
    render: function (show) {
      var that = this;

      this.popoverElement = $("<div />").addClass("popover-dummy").css("position", "absolute").appendTo($(document.body));

      this.popover = this.popoverElement.popover({
        title: this.Header,
        content: this.Content || "",
        placement: this.Placement || "left",
        trigger: this.Trigger || "click",
        delay: this.Delay || 0
      }).data("popover");

      if (show === true) {
        this.show();
      }

      return this;
    },
    setContent: function (el) {
        this.$body.empty().append(el);
      },

    show: function () {
      var position = this.$el.offset(),
        height = this.$el.height();

      this.popoverElement.css("top", position.top + (height / 2));
      this.popoverElement.css("left", position.left + this.offsetLeft);

      this.popoverElement.popover("show");
      this.$body = this.popover.$tip.find(".popover-content");

      if (!this.Content) {
        this.setContent(new App.Views.WaitSpinnerView().render().$el);
      }

      if (this.popover.options.placement === "left" || this.popover.options.placement === "right") {
        this.popover.$tip.find(".arrow").css("top", this.offsetTop);
      }

      $("<button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>")
        .appendTo(this.popover.$tip.find(".popover-title"))
        .one("click", this.remove);
    },

    hide: function () {
      this.popoverElement.popover("hide");
    },

    toggle: function () {
      this.popoverElement.popover("toggle");
    },

    destroy: function () {
      this.popoverElement.popover("destroy");
      this.popoverElement.remove();
      this.popoverElement = null;
    },

    remove: function () {
      this.destroy();
    }
  });
}