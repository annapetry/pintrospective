Pintrospective.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.createSubviews();
  },
  
  events: {
    "click button.unfollowed": "followBoard",
    "click button.followed": "unfollowBoard",
    "submit form#edit-board-form": "editBoard",
    "click button#delete-board": "removeBoard"
  },

  createSubviews: function () {
    var pinIndex = new Pintrospective.Views.PinsIndex({
      model: this.model,
      collection: this.model.pins(),
      user: this.model.get('user_id')
    })
    this.addSubviewBefore('#pins', pinIndex);  
  },
  
  render: function () {
    var follows = this.model.followed(CURRENT_USER_ID, this.model);
    
    var renderedContent = this.template({ 
      board: this.model,
      user: CURRENT_USER_ID,
      followed: follows
    });
    this.$el.html(renderedContent);
    this.attachSubviewsBefore();
    
    $('.pin-count').addClass('active');
    this.$editBoardModal = this.$('#editBoardModal');
    this.$deleteBoardModal = this.$('#deleteBoardModal');
    this.$followToggle = this.$('#board-follow-button');
    this.addToggle();
    // this.stickit();
    
    return this;  
  },
  
  addToggle: function () {
    this.followState = this.$followToggle.data('follow-state');
    if (this.followState == "followed") {
      this.$followToggle.addClass('followed');
      this.$followToggle.prop("disabled", false);
      this.$followToggle.html("Unfollow Board");
    } else if (this.followState == "unfollowed") {
      this.$followToggle.addClass('unfollowed');
      this.$followToggle.prop("disabled", false);
      this.$followToggle.html("Follow Board");
    }
  },
  
  editBoard: function (event) {
    event.preventDefault();
    var cat;
    var formData = $(event.currentTarget).serializeJSON();
    if (formData.board.category == "What kind of board is it?") {
      cat = "Other";
    } else {
      cat = formData.board.category;
    }
    this.model.set({
      title: formData.board.title,
      description: formData.board.description,
      category: cat
    });
    var that = this;
    
    this.model.save({}, {
        url: "api/users/" + CURRENT_USER_ID + "/boards/" + this.model.id,
        success: function () {
          that.$editBoardModal.modal('hide');
          that.$editBoardModal.one('hidden.bs.modal', function (){
            that.collection.add(that.model);
          });
        }
    });
    
  },
  
  followBoard: function (event) {
    debugger
    event.preventDefault();
    var followee_board = new Pintrospective.Models.Follow({
      followable_id: this.model.id, 
      followable_type: 'Board'
    });
    followee_board.save({}, {
      success: function () {
        this.$followToggle.data("follow-state", 'followed');
        this.$followToggle.removeClass('unfollowed');
        this.$followToggle.addClass('followed');
        this.addToggle();
      }
    });
  },
  
  unfollowBoard: function (event) {
    event.preventDefault();
    
    var followee_board = new Pintrospective.Models.Follow({
      followable_id: this.model.id,
      followable_type: 'Board'
    });

    followee_board.delete({}, {
      success: function () {
        this.$followToggle.data("follow-state", 'unfollowed');
        this.$followToggle.addClass('unfollowed');
        this.$followToggle.removeClass('followed');
        this.addToggle();
      }
    });
  },
  
  removeBoard: function (event) {
    event.preventDefault();
    var that = this;
    
    this.$deleteBoardModal.modal('hide');
    this.$deleteBoardModal.one('hidden.bs.modal', function (){
      that.model.destroy();        
      window.location.hash = "/users/" + CURRENT_USER_ID;  
      setTimeout(function () {
        window.location.reload();        
      }, 1);    
    });
    
  },
  
  removePin: function (pinSubView) {
    this.removeSubview('#pins', pinSubView);
  }

});

