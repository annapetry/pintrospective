Pintrospective.Collections.Categories = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.category = options.category;
  },
  
  model: Pintrospective.Models.Board,
  
  url: function () {
    return '/search/' + this.category;
  },
  
  getOrFetch: function (category) {
    var boards = this;
    var board = this.get('category');
    
    if (!board) {
      board = new Pintrospective.Models.Board({ category: category });
      board.collection = this;
      board.fetch({
        success: function () {
          boards.add(board);
        }, 
        url: '/boards' + this.category
      });
    } else {
      board.fetch();
    }
    
    return board;
  }
});
