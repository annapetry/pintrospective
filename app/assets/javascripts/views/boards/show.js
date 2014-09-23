Pintrospective.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  addPin: function (pin) {
    var showPin = new Pintrospective.Views.PinShow({ model: pin });
    this.listenTo(showPin, "remove", this.removePin);
  },
  
  render: function () {
    
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);

    this.attachSubviews();
    
    return this;  
  },
  
  removeBoard: function (event) {
    event.preventDefault();
    this.model.destroy();
    
    window.location.hash = '';
  },
  
  removePin: function (pinSubView) {
    this.removeSubview('#pins', pinSubView);
  }

});

