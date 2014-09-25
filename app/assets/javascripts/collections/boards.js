Pintrospective.Collections.Boards = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.user = options.user;
  },
  
  model: Pintrospective.Models.Board,
  
  url: function () {
    return this.user.url() + '/boards';
  },
  
  getOrFetch: function (id) {
    var boards = this;
    var board = this.get(id);
    
    if (!board) {
      board = new Pintrospective.Models.Board({ id: id });
      board.collection = this;
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
