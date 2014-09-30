Pintrospective.Views.NewPin = Backbone.View.extend({
  template: JST["pins/new"],
  
  events: {
    "submit form#new-pin-form": "getUrl",
    "submit form#new-pin-info": "addPin",
    "submit form#uploadPin": "getUrl"
  },
  
  initialize: function(options) {
    this.board = options.board;
  },
  
  // Should I add an ord 
  
  className: 'stamp index-items',
  
  render: function () {
    var renderedContent = this.template({ pin: this.model });
    this.$el.html(renderedContent);
    
    this.$uploadPinModal = this.$('#uploadPinModal');
    this.$webPinModal = this.$('#webPinModal');
    this.$pinInfoModal = this.$('#pinInfoModal');
    this.createSubview();

    return this;
  },
  
  createSubview: function () {
    var $filePickerInput = this.$('input[type=filepicker]');
    filepicker.constructWidget($filePickerInput[0]);
  },
  
  addPin: function (event) {
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    this.model.set({
      description: formData.pin.description,
      board_id: this.board.id
    });
    
    this.$pinInfoModal.modal('hide');
    
    var that = this;
    this.$pinInfoModal.one('hidden.bs.modal', function () {
      that.model.save({}, {
        success: function () {        
          that.collection.add(that.model);
        }
      });
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
    
    this.$uploadPinModal.on('hide.bs.modal', function() {
      that.$pinInfoModal.modal('show');
    });
    
    this.$webPinModal.on('hide.bs.modal', function() {
      that.$pinInfoModal.modal('show');
    })
    
    this.$uploadPinModal.modal('hide');
    this.$webPinModal.modal('hide');
  }
});