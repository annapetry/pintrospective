Pintrospective.Views.BoardsIndexItem = Backbone.View.extend({
  template: JST['boards/index_item'],
  
  events: {
    "click button#remove-board": "removeBoard"
  },
  
  className: 'board-index-items',
  
  render: function(){
    var content = this.template({ board: this.model });
    this.$el.prepend(content);
    return this;
  },
  
  removeBoard: function (event) {
    event.preventDefault();
    this.model.destroy(); 
    
    this.trigger("remove", this);
  },
});