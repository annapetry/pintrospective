Pintrospective.Views.NewPin = Backbone.View.extend({
  template: JST["pins/new"],
  
  events: {
    "submit form#new-pin-form": "addPin"
  },
  
  classname: 'col-md-2',
  
  render: function () {
    var renderedContent = this.template({ pin: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  // createSubview: function () {
  //   var $filePickerInput = this.$('input[type=filepicker]');
  //   filepicker.constructWidget($filePickerInput[0]);
  // },
  
  addPin: function (event) {
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    var pin = new Pintrospective.Models.Pin({
      description: formData.pin.description,
      board_id: this.model.id
    });
    var image = new Pintrospective.Models.Image({
      url: formData.image.url,
      imageable_type: "Pin"
    })
    var that = this;
    
    pin.save({}, {
      success: function () {
        that.collection.add(pin);
        image.save({ imageable_id: pin.id });
        that.render();
      }
    });
  }
});