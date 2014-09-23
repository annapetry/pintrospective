Pintrospective.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.pins(), "add", this.addPin);
    
    this.createSubviews();
    this.addFormView();
  },
  
  createSubviews: function () {
    var that = this;
    this.model.pins().each(function (pin) {
      that.addPin(pin);
    });
  },
  
  addFormView: function () {
    var formView = new Pintrospective.Views.NewPin({
      model: this.model,
      collection: this.model.pins()
    });

    this.addSubview('#pin-form', formView);
  },
  
  addPin: function (pin) {
    var showPin = new Pintrospective.Views.PinShow({ model: pin });
    this.addSubview('#pins', showPin);
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

