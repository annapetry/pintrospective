Pintrospective.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],

  initialize: function (options) {
    this.subview = options.subview;
    this.htmlEl = options.htmlEl;
    this.listenTo(this.model, "sync", this.render);
    this.createSubviews();  
  },
  
  events: {
    "click button.unfollowed": "followUser",
    "click button.followed": "unfollowUser",
    "submit form#edit-user-form": "editUser"
  },

  createSubviews: function () {
    var form = (CURRENT_USER_ID == this.model.id) ? true : false;
    var view = new this.subview({
      model: this.model,
      collection: this.collection,
      addForm: form
    });
    this.addSubviewBefore(this.htmlEl, view);
  },

  createSubview: function () {
    var $filePickerInput = this.$('input[type=filepicker]');
    filepicker.constructWidget($filePickerInput[0]);
  },

  render: function () {
    var renderedContent = this.template({ 
      user: this.model,
      current_user: CURRENT_USER_ID
    });
    this.$el.html(renderedContent);
    this.attachSubviewsBefore();
    this.createSubview();

    this.$editUserModal = this.$('#editUserModal');
    this.$followToggle = this.$('#user-follow-button');
    this.addToggle();

    this.$('a').removeClass('active');
    var frag = '/#/' + Backbone.history.fragment;
    this.$("a[href='" + frag + "']").addClass('active');

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
    var follow = new Pintrospective.Models.Follow({ id: this.model.get('current_follow')});
    var that = this;
    follow.destroy({
      success: function () {
        that.$followToggle.data("follow-state", 'unfollowed');
        that.$followToggle.addClass('unfollowed');
        that.$followToggle.removeClass('followed');
        that.addToggle();
      }
    });
  },

  editUser: function (event) {
    debugger
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.$editUserModal.modal('hide');
    
    var img = (formData.image.url) ? formData.image.url : this.model.escape('url');

    var that = this;
    this.$editUserModal.one('hidden.bs.modal', function (){
      that.model.set({
        username: formData.user.username,
        description: formData.user.description,
        location: formData.user.location,
        image_attributes: {
          url: img        
        }
      });
      var image_id = that.model.get('image_id');  

      that.model.save();
    });
  },

  removeBoard: function (boardSubView) {
    this.removeSubview('#board-items', boardSubView);
  },
  
  changeHeader: function () {
    alert("hi!");
  }
});

