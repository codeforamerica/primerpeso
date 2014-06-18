var App = require('./start');
var Bootstrap = require('./bootstrap');
var Router = require('./routers/router');

$(document).ready(function() {
//  Bootstrap.i18nLoader(function loadI18n() {
    App.Routers.Instances.router = new Router();
    Backbone.history.start();
//    App.swiftclick = SwiftClick.attach(document.body);
//  });
});
