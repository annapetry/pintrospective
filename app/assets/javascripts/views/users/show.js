Pintrospective.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.createSubviews();  
  },
  
  events: {
    "click button.unfollowed": "followUser",
    "click button.followed": "unfollowUser",
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
    
    this.$followToggle = this.$('#user-follow-button');
    this.addToggle();
    
    return this;  
  },
  
  addToggle: function () {
    this.followState = this.$followToggle.data('follow-state');
    if (this.followState == "followed") {
      this.$followToggle.addClass('followed');
      this.$followToggle.prop("disabled", false);
      this.$followToggle.html("Unfollow User");
      
    } else if (this.followState == "unfollowed") {
      this.$followToggle.addClass('unfollowed');
      this.$followToggle.prop("disabled", false);
      this.$followToggle.html("Follow User");
    }
  },
  
  
  followUser: function (event) {
    debugger
    event.preventDefault();
    var followee_user = new Pintrospective.Models.Follow({
      followable_id: this.model.id, 
      followable_type: 'User'
    });
    var that = this;
    followee_user.save({}, {
      success: function () {
        that.model.followers().add(followee_user);
        that.$followToggle.data("follow-state", 'followed');
        that.$followToggle.removeClass('unfollowed');
        that.$followToggle.addClass('followed');
        that.addToggle();
      }
    });
  },
  
  unfollowUser: function (event) {
    event.preventDefault();
    if (this.model.followers().length > 0) {
      var follow = this.model.followers().first();
      
      var that = this;
      
      follow.destroy({
        success: function () {
          that.$followToggle.data("follow-state", 'unfollowed');
          that.$followToggle.addClass('unfollowed');
          that.$followToggle.removeClass('followed');
          that.addToggle();
        }
      });
    }
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

