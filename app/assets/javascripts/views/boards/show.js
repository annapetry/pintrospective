Pintrospective.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.createSubviews();
  },
  
  createSubviews: function () {
    var pinIndex = new Pintrospective.Views.PinsIndex({
      model: this.model,
      collection: this.model.pins()
    })
    this.addSubviewBefore('#pins', pinIndex);  
  },
  
  render: function () {
    var renderedContent = this.template({ 
      board: this.model,
      user: CURRENT_USER_ID
    });
    this.$el.html(renderedContent);
    this.attachSubviewsBefore();
    
    $('.pin-count').addClass('active');
    
    return this;  
  },
  
  removePin: function (pinSubView) {
    this.removeSubview('#pins', pinSubView);
  }

});

