Pintrospective.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    
    this.createSubviews();
  },

  createSubviews: function () {
    var boardIndex = new Pintrospective.Views.BoardsIndex({
      collection: this.model.boards()
    })
    this.addSubview('#board-items', boardIndex);  
  },
  
  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);

    this.attachSubviews();
    
    return this;  
  },
  
  removeBoard: function (boardSubView) {
    this.removeSubview('#board-items', boardSubView);
  }

});

