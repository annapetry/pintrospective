Pintrospective.Views.BoardSearch = Backbone.CompositeView.extend({
  template: JST["boards/search"],
  
  inititalize: function(options) {
    this.category = options.category;
  },

  createSubviews: function () {
    var categoryView = new Pintrospective.Views.BoardsIndex({
      collection: boards
    });
    
    this.addSubviewBefore('#boards', categoryView);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      category: this.category
    });
  
    this.$el.html(renderedContent);
    this.attachSubviewsBefore();
    
    return this;  
  }
});

