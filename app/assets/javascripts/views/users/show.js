Pintrospective.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.createSubviews();  
  },
  
  events: {
    "click button.follow-user": "followUser",
    "click button.unfollow-user": "unfollowUser"
  },

  createSubviews: function () {
    this.model.boards().fetch()
    var boardIndex = new Pintrospective.Views.BoardsIndex({
      model: this.model,
      collection: this.model.boards()
    })
    this.addSubviewBefore('#board-items', boardIndex);  
  },
  
  render: function () {
    var renderedContent = this.template({ 
      user: this.model
    });
    this.$el.html(renderedContent);
    this.attachSubviewsBefore();
    
    return this;  
  },
  
  followUser: function (event) {
    event.preventDefault();

    var followee_user = new Pintrospective.Models.Follow({
      followable_id: this.model.id, 
      followable_type: 'User'
    });
    var that = this;
    followee_user.save({}, {
      success: function () {
        // THIS DOES NOT PERSIST
        var $button = that.$el.find('#user-follow-button');
        $button.removeClass('follow-user');
        $button.addClass('unfollow-user');
        $button.text("Unfollow User");
        
          that.model.boards().each(function (board) {
          // setTimeout(function (){
            var followee_board = new Pintrospective.Models.Follow({
              followable_id: board.id,
              followable_type: 'Board'
            });
            followee_board.save();
          // }, 1);
        });
      }
    });
    
  },
  
  unfollowUser: function (event) {
    event.preventDefault();
    debugger
    

  },
  
  removeBoard: function (boardSubView) {
    this.removeSubview('#board-items', boardSubView);
  }

});

