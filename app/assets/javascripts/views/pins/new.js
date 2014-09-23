Pintrospective.Views.NewPin = Backbone.View.extend({
  template: JST["pins/new"],
  
  events: {
    "submit form#new-pin-form": "addPin"
  },
  
  render: function () {
    var renderedContent = this.template({ pin: this.model });
    this.$el.html(renderedContent);
    return this;
  },
  
  addPin: function (event) {
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    var pin = new Pintrospective.Models.Pin({
      description: formData.pin.description,
      board_id: this.model.id
    });
    var that = this;
    
    pin.save({}, {
      success: function () {
        that.collection.add(pin);
        that.render();
      }
    });
  }
});