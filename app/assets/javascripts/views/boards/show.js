Pintrospective.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.createSubviews();
  },
  
  events: {
    "click button#board-follow-button": "followBoard",
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
    var renderedContent = this.template({ 
      board: this.model,
      user: CURRENT_USER_ID
    });
    this.$el.html(renderedContent);
    this.attachSubviewsBefore();
    
    $('.pin-count').addClass('active');
    this.$editBoardModal = this.$('#editBoardModal');
    this.$deleteBoardModal = this.$('#deleteBoardModal');
    // this.stickit();
    
    return this;  
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
    event.preventDefault();
    var followee_board = new Pintrospective.Models.Follow({
      followable_id: this.model.id, 
      followable_type: 'Board'
    });
    followee_board.save({});
  },
  
  removeBoard: function (event) {
    event.preventDefault();
    var that = this;
    
    this.$deleteBoardModal.modal('hide');
    this.$deleteBoardModal.one('hidden.bs.modal', function (){
      that.model.destroy();        
      window.location.hash = '';  
      setTimeout(function () {
        window.location.reload();        
      }, 1);    
    });
    
  },
  
  removePin: function (pinSubView) {
    this.removeSubview('#pins', pinSubView);
  }

});

