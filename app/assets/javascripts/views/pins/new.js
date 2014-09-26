Pintrospective.Views.NewPin = Backbone.View.extend({
  template: JST["pins/new"],
  
  events: {
    "submit form#new-pin-form": "getUrl",
    "submit form#new-pin-info": "addPin"
  },
  
  className: 'index-items',
  
  render: function () {
    var renderedContent = this.template({ pin: this.model });
    this.$el.html(renderedContent);
    
    this.$uploadPinModal = this.$('#uploadPinModal');
    this.$webPinModal = this.$('#webPinModal');
    this.$pinInfoModal = this.$('#pinInfoModal');

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
    
    this.$pinInfoModal.modal('hide');
    
    var that = this;
    pin.save({}, {
      success: function () {
        that.collection.add(pin);
        that.image.save({ imageable_id: pin.id });
      }
    });
  },
  
  getUrl: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.image = new Pintrospective.Models.Image({
      url: formData.image.url,
      imageable_type: "Pin"
    });
       
    var that = this;
    this.$webPinModal.on('hide.bs.modal', function(){
      that.$pinInfoModal.modal('show');
    })
    this.$webPinModal.modal('hide');
  }
});