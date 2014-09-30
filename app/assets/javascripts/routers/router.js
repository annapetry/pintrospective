Pintrospective.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.pinCollection = new Pintrospective.Collections.Pins();
  },

  routes: {
    "": "pinsIndex",
    "users/:user_id/boards/:id": "boardShow",
    "users/:id": "userShow",
    "search/:category": "boardSearch"
  },

  userShow: function (id) {
    var user = Pintrospective.Collections.users.getOrFetch(id);
    var userShow = new Pintrospective.Views.UserShow({
      model: user
    });
    
    this._swapView(userShow);
  },
  
  pinsIndex: function () {
    this.pinCollection.fetch();
    var pinIndex = new Pintrospective.Views.PinsIndex({
      collection: this.pinCollection
    });

    this._swapView(pinIndex);
  },

  boardShow: function (user_id, id) {
    var user = Pintrospective.Collections.users.getOrFetch(user_id);
    var board = user.boards().getOrFetch(id);
    var showView = new Pintrospective.Views.BoardShow({
      model: board
    });
    
    this._swapView(showView);
  },
  
  boardSearch: function (category) {
    var boards = new Pintrospective.Collections.Boards([],{});
    boards.url = '/api/search/' + category
    boards.fetch();
    var categoryView = new Pintrospective.Views.BoardsIndex({
      collection: boards
    });
    
    this._swapView(categoryView);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});