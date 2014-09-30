Pintrospective.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],
  
  initialize: function () {
    // collection is boards
    this.listenTo(this.collection, "sync add remove", this.render);
    this.listenTo(this.collection, "add", this.addBoard);
    
    this.createSubviews();
    
    this.addFormView();
  },
  
  createSubviews: function () {
    var that = this;
    this.collection.each(function (board) {
      that.addBoard(board);
    });
  },
  
  // pass this.model as the user
  addFormView: function () {
    var formView = new Pintrospective.Views.NewBoard({ 
      model: new Pintrospective.Models.Board(),
      collection: this.model.boards()
    });
    this.addSubviewBefore('#board-items', formView);
  },
  
  addBoard: function (board) {
    var indexItem = new Pintrospective.Views.BoardsIndexItem({ model: board });
    this.addSubviewBefore('#board-items', indexItem);
    this.listenTo(indexItem, "remove", this.removeBoard);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      boards: this.collection
    });
    this.$el.html(renderedContent);
    this.addFormView();
    this.attachSubviewsBefore();
    
    $('.board-count').addClass('active');
    
    var that = this;
    setTimeout(function(){
      var $container = that.$el.find('#board-items').isotope({
        itemSelector: '.board-index-items',
        stamp: '.stamp'
      }); 
      // layout Isotope again after all images have loaded
      $container.imagesLoaded( function() {
        $container.isotope('layout');
      });
    }, 0);
    
    return this;
  },
  
  removeBoard: function (boardSubView) {
    this.removeSubview('#board-items', boardSubView);
  }
});