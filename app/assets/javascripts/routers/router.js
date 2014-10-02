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
    "search/:category": "pinSearch",
    ":user_id/:board_id/followers": "boardFollowers"
  },

  userShow: function (id) {
    var user = Pintrospective.Collections.users.getOrFetch(id);
    var boards = user.boards();

    
    var userShow = new Pintrospective.Views.UserShow({
      model: user,
      collection: boards,
      subview: Pintrospective.Views.BoardsIndex,
      htmlEl: '#board-items'
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
    
    var pins = board.pins();

    var boardShow = new Pintrospective.Views.BoardShow({
      model: board,
      collection: pins,
      subview: Pintrospective.Views.PinsIndex,
      htmlEl: '#pins'
    });

    this._swapView(boardShow);
  },
  
  boardSearch: function (category) {
    var boards = new Pintrospective.Collections.Boards([],{});
    boards.url = '/api/search/' + category;
    boards.fetch();
    var categoryView = new Pintrospective.Views.BoardsIndex({
      collection: boards,
      category: category
    });
    
    this._swapView(categoryView);
  },
  
  pinSearch: function (category) {    
    var pins = new Pintrospective.Collections.Pins([],{});
    pins.url = '/api/search/' + category;
    pins.fetch(); 

    var categoryView = new Pintrospective.Views.PinsSearch({
      collection: pins,
      category: category
    });
    
    this._swapView(categoryView);
  },
  
  followersIndex: function (id) {
    var user = Pintrospective.Collections.users.getOrFetch(id);
    var users = new Pintrospective.Collections.Users([],{});
    users.url = '/api/users/' + id + '/followers'
    users.fetch();
      
    var userShow = new Pintrospective.Views.UserShow({
      model: user,
      collection: users,
      subview: Pintrospective.Views.UsersIndex,
      htmlEl: '#user-items'
    });
    this._swapView(userShow);
  },
  
  followingIndex: function (id) {
    var user = Pintrospective.Collections.users.getOrFetch(id);
    var users = new Pintrospective.Collections.Users([],{});
    users.url = '/api/users/' + id + '/following'
    users.fetch();
    
    var userShow = new Pintrospective.Views.UserShow({
      model: user,
      collection: users,
      subview: Pintrospective.Views.UsersIndex,
      htmlEl: '#user-items'
    });
    this._swapView(userShow);
  },
  
  userPinsIndex: function (id) {
    var user = Pintrospective.Collections.users.getOrFetch(id);
    
    var pins = new Pintrospective.Collections.Pins([],{});
    pins.url = '/api/users/' + id + '/pins'
    pins.fetch();

    var userShow = new Pintrospective.Views.UserShow({
      model: user,
      collection: pins,
      subview: Pintrospective.Views.PinsIndex,
      htmlEl: '#pin-items'
    });
    this._swapView(userShow);
  },
  
  boardFollowers: function (user_id, board_id) {
    var user = Pintrospective.Collections.users.getOrFetch(user_id);
    var board = user.boards().getOrFetch(board_id);
    var users = new Pintrospective.Collections.Users([],{});
    users.url = '/api/' + user_id + '/' + board_id + '/followers'
    users.fetch();
    
    
    var boardShow = new Pintrospective.Views.BoardShow({
      model: board,
      collection: users,
      subview: Pintrospective.Views.UsersIndex,
      htmlEl: '#user-items'
    });

    this._swapView(boardShow); 
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});