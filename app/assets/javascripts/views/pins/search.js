Pintrospective.Views.PinsSearch = Backbone.CompositeView.extend({
  template: JST["pins/search"],
  
  initialize: function (options) {
    this.category = options.category;
    this.createSubviews();  
  },
  
  createSubviews: function () {
    var categoryView = new Pintrospective.Views.PinsIndex({
      collection: this.collection
    });
    
    this.addSubviewBefore('#pins', categoryView);
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

