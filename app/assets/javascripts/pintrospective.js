window.Pintrospective = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    new Pintrospective.Routers.Router({
      $rootEl: $('#main')
    })
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Pintrospective.initialize();
});


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}