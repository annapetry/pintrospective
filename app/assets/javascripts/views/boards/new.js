Pintrospective.Views.NewBoard = Backbone.View.extend({
  template: JST["boards/new"],
  
  events: {
    "submit form#new-board-form": "addBoard"
  },
  
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
      success: function () {
        Pintrospective.Collections.boards.add(board);
        that.render();
      }
    });
  }
});