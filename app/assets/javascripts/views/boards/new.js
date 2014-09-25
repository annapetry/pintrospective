Pintrospective.Views.NewBoard = Backbone.View.extend({
  template: JST["boards/new"],
  
  initialize: function () {
  },
  
  events: {
    "submit #new-board-form": "addBoard"
  },
  
  className: 'new-board-view',
  
  render: function () {
    
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    this.delegateEvents();
    return this;  
  },
  
  addBoard: function (event) {
    event.preventDefault();
    debugger
    var formData = $(event.currentTarget).serializeJSON();
    var board = new Pintrospective.Models.Board({
      title: formData.board.title,
      description: formData.board.description
    });
    var that = this;
    
    board.save({}, {
      success: function () {
        $('#addBoardModal').modal('toggle');
        setTimeout(function () {
          Pintrospective.Collections.boards.add(board);
        }, 1);
      }
    });
  }
});