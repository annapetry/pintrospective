Pintrospective.Collections.Boards = Backbone.Collection.extend({
  model: Pintrospective.Models.Board,
  
  url: 'api/boards',
  
  getOrFetch: function (id) {
    var boards = this;
    var board = this.get(id);
    
    if (!board) {
      board = new Pintrospective.Models.Board({ id: id });
      board.fetch({
        success: function () {
          boards.add(board);
        }
      });
    } else {
      board.fetch();
    }
    
    return board;
  }
});

Pintrospective.Collections.boards = new Pintrospective.Collections.Boards;