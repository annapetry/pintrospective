Pintrospective.Views.NewBoard = Backbone.View.extend({
  template: JST["boards/new"],
  
  events: {
    "submit #new-board-form": "addBoard"
  },
  
  className: 'new-board-view',
  
  render: function () {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
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
        $('#addBoardModal').modal('toggle');
        setTimeout(function () {
          debugger
          that.model.boards().add(board);
        }, 1);
      }
    });
  }
});