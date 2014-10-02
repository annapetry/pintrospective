Pintrospective.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],

  initialize: function (options) {
    this.subview = options.subview;
    this.htmlEl = options.htmlEl;
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
    var view = new this.subview({
      model: this.model,
      collection: this.collection,
      // addForm: form
    });
    this.addSubviewBefore(this.htmlEl, view);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      board: this.model,
      current_user: CURRENT_USER_ID,
      cats: CATEGORIES
    });
  
    this.$el.html(renderedContent);
    this.attachSubviewsBefore();
        
    this.$editBoardModal = this.$('#editBoardModal');
    this.$deleteBoardModal = this.$('#deleteBoardModal');
    this.$followToggle = this.$('#board-follow-button');
    this.addToggle();
    
    this.$('.large-section-divider a').removeClass('active');
    var frag = '/#/' + Backbone.history.fragment;
    this.$("a[href='" + frag + "']").addClass('active');
    
    
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
  
  
  followBoard: function (event) {
    event.preventDefault();
    var followee_board = new Pintrospective.Models.Follow({
      followable_id: this.model.id, 
      followable_type: 'Board'
    });
    var that = this;
    followee_board.save({}, {
      success: function () {
        that.model.followers().add(followee_board);
        that.$followToggle.data("follow-state", 'followed');
        that.$followToggle.removeClass('unfollowed');
        that.$followToggle.addClass('followed');
        that.addToggle();
      }
    });
  },
  
  unfollowBoard: function (event) {
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
  
  editBoard: function (event) {
    event.preventDefault();
    var cat;
    var formData = $(event.currentTarget).serializeJSON();
    if (formData.board.category == "What kind of board is it?") {
      cat = "Other";
    } else {
      cat = formData.board.category;
    }
    this.$editBoardModal.modal('hide');
  
    var that = this;
    this.$editBoardModal.one('hidden.bs.modal', function (){
      that.model.set({
        title: formData.board.title,
        description: formData.board.description,
        category: cat
      });
    
      that.model.save({}, {
        url: "api/users/" + CURRENT_USER_ID + "/boards/" + that.model.id
      }
    )});
  },

  removeBoard: function (event) {
    event.preventDefault();
    var that = this;
    
    this.$deleteBoardModal.modal('hide');
    this.$deleteBoardModal.one('hidden.bs.modal', function (){
      that.model.destroy();        
      window.location.hash = "/users/" + CURRENT_USER_ID;  
      // setTimeout(function () {
 //        window.location.reload();
 //      }, 1);
    });
    
  }
});

