Pintrospective.Views.BoardsIndexItem = Backbone.View.extend({
  template: JST['boards/index_item'],

  className: 'board-index-items',
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function(){
    var content = this.template({ board: this.model, user: CURRENT_USER_ID });
    this.$el.prepend(content);
    this.$editBoardModal = this.$('#editBoardModal');
    this.$deleteBoardModal = this.$('#deleteBoardModal');
    return this;
  }
});