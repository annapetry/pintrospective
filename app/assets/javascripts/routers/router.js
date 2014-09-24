Pintrospective.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "boardsIndex",
    "users/:id": "userShow",
    "boards/:id": "boardShow"
  },

  userShow: function (id) {
    
  },
  
  boardsIndex: function () {
    Pintrospective.Collections.boards.fetch();
    var indexView = new Pintrospective.Views.BoardsIndex({
      collection: Pintrospective.Collections.boards
    });
    
    this._swapView(indexView);
  },
  
  boardShow: function (id) {
    var board = Pintrospective.Collections.boards.getOrFetch(id);
    var showView = new Pintrospective.Views.BoardShow({
      model: board
    });
    
    this._swapView(showView);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});