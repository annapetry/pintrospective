Pintrospective.Views.NewBoard = Backbone.View.extend({
  template: JST["boards/new"],
  
  events: {
    "submit #new-board-form": "addBoard"
  },
  
  className: 'board-index-items',
  
  render: function () {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    
    this.$addBoardModal = this.$('#addBoardModal');
    return this;  
  },
  
  addBoard: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var board = new Pintrospective.Models.Board({
      title: formData.board.title,
      description: formData.board.description
    });
    var that = this;
    
    board.save({}, {
      url: "api/users/" + CURRENT_USER_ID + "/boards",
      success: function () {
        that.$addBoardModal.modal('hide');
        
        that.$addBoardModal.one('hidden.bs.modal', function (){
          that.model.boards().add(board);
        });
      }
    });
  }
});