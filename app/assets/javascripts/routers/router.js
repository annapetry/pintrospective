Pintrospective.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.pinCollection = new Pintrospective.Collections.Pins();
  },

  routes: {
    "": "pinsIndex",
    "users/:user_id/boards/:id": "boardShow",
    "users/:id/followers": "followersIndex",
    "users/:id/following": "followingIndex",
    "users/:id/pins": "userPinsIndex",
    "users/:id": "userShow",
    "boards/:id/followers": "boardFollowers",
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
  
  followersIndex: function (id) {
    var users = new Pintrospective.Collections.Users([],{});
    users.url = '/api/users/' + id + '/followers'
    users.fetch();
    // var followerView = new Pintrospective.Views.UsersIndex({
    //   collection: users
    // });
    
    var userShow = new Pintrospective.Views.UserShow({
      collection: users
    });
    
    this._swapView(userShow);
  },
  
  followingIndex: function (id) {
    var users = new Pintrospective.Collections.Users([],{});
    users.url = '/api/users/' + id + '/following'
    users.fetch();
    var followingView = new Pintrospective.Views.UsersIndex({
      collection: users
    });
    
    this._swapView(followingView);
  },
  
  userPinsIndex: function (id) {
    var pins = new Pintrospective.Collections.Pins([],{});
    pins.url = '/api/users/' + id + '/pins'
    pins.fetch();
    var pinsView = new Pintrospective.Views.PinsIndex({
      collection: pins
    });
    
    this._swapView(pinsView);
  },
  
  boardFollowers: function (id) {
    var users = new Pintrospective.Collections.Users([],{});
    users.url = '/api/boards/' + id + '/followers'
    users.fetch();
    var followersView = new Pintrospective.Views.UsersIndex({
      collection: users
    });
    
    this._swapView(followersView);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});