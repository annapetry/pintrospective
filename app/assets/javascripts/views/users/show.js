Pintrospective.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.createSubviews();  
  },
  
  events: {
    "click button.follow-user": "followUser",
    "click button.unfollow-user": "unfollowUser",
    "submit form#edit-user-form": "editUser",
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
      user: this.model,
      current_user: CURRENT_USER_ID
    });
    this.$el.html(renderedContent);
    this.attachSubviewsBefore();
    this.$editUserModal = this.$('#editUserModal');
    $('#edit-user-profile').popover({
      html: true,
      placement: 'bottom'
    });
    
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
  
  editUser: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.$editUserModal.modal('hide');
  
    var that = this;
    this.$editUserModal.one('hidden.bs.modal', function (){
      that.model.set({
        username: formData.user.username,
        description: formData.user.description,
        location: formData.user.location
      });
      
      // need to update image added
    
      that.model.save();
    });
  },
  
  removeBoard: function (boardSubView) {
    this.removeSubview('#board-items', boardSubView);
  }

});

