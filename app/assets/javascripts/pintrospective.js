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
