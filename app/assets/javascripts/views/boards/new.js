Pintrospective.Views.NewBoard = Backbone.View.extend({
  template: JST["boards/new"],
  
  events: {
    "submit #new-board-form": "addBoard"
  },
  
  className: 'stamp board-index-items',
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    this.$addBoardModal = this.$('#addBoardModal');
    
    return this;  
  },
  
  addBoard: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.set({
      title: formData.board.title,
      description: formData.board.description
    });
    var that = this;
    
    this.model.save({}, {
      url: "api/users/" + CURRENT_USER_ID + "/boards",
      success: function () {
        that.$addBoardModal.modal('hide');
        
        that.$addBoardModal.one('hidden.bs.modal', function (){
          that.collection.add(that.model);
        });
      }
    });
  }
});