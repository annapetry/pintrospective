Pintrospective.Views.PinsIndex = Backbone.CompositeView.extend({
  template: JST['pins/index'],
  
  initialize: function () {
    this.listenTo(this.collection, "sync remove", this.render);
    this.listenTo(this.collection, "add", this.addPin);
    
    this.createSubviews();
    this.addFormView();
  },
  
  createSubviews: function () {
    var that = this;
    this.collection.each(function (pin) {
      that.addPin(pin);
    });
  },
  
  addFormView: function () {
    var formView = new Pintrospective.Views.NewPin({ model: this.model });
    this.addSubview('#form-wrapper', formView);
  },
  
  addPin: function (pin) {
    var indexItem = new Pintrospective.Views.PinsIndexItem({ model: pin });
    this.addSubview('#pin-items', indexItem);
    this.listenTo(indexItem, "remove", this.removePin);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      pins: this.collection
    });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  },
  
  removePin: function (pinSubView) {
    this.removeSubview('#pin-items', pinSubView);
  }
});