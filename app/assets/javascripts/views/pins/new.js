Pintrospective.Views.NewPin = Backbone.View.extend({
  template: JST["pins/new"],
  
  events: {
    "submit form#new-pin-form": "getUrl",
    "submit form#new-pin-info": "addPin"
  },
  
  initialize: function(options) {
    this.board = options.board
  },
  
  // Should I add an ord 
  
  className: 'stamp index-items',
  
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
    this.model.set({
      description: formData.pin.description,
      board_id: this.board.id
    });

    var that = this;
    this.model.save({}, {
      success: function () {
        that.$pinInfoModal.modal('hide');
        
          that.$pinInfoModal.one('hidden.bs.modal', function () {
          that.collection.add(that.model);
        });
      }
    });
    
  },
  
  getUrl: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.set({
      image_attributes: {
        url: formData.image.url,
        imageable_type: "Pin"          
      }
    });

    var that = this;
    this.$webPinModal.on('hide.bs.modal', function(){
      that.$pinInfoModal.modal('show');
    })
    this.$webPinModal.modal('hide');
  }
});