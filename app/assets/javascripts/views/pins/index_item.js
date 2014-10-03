Pintrospective.Views.PinsIndexItem = Backbone.View.extend({
  template: JST['pins/index_item'],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },
  
  events: {
    "click button#delete-pin": "removePin",
    "click img.focal-img": 'showImageModal',
    "click #pinner-id": 'hideImageModal',
    "click .edit-pin-btn": 'showEditPinModal',
    "click #close-modal": 'hideEditPinModal',
    "submit form#edit-pin-form": "editPin",
    "click div.thumb-panel-footer": "redirectUser"
  },
  
  className: 'index-items',
  
  render: function(){
    var content = this.template({ 
      pin: this.model,
      current_user: CURRENT_USER_ID
    });
    this.$el.html(content);
    this.$editPinModal = this.$('#editPinModal');
    this.$pinZoomModal = this.$('#pinZoom');
    this.$deletePinModal = this.$('#deletePinModal');
    
    return this;
  },
  
  removePin: function (event) {
    event.preventDefault();
    var that = this;
     
    this.$deletePinModal.modal('hide');
    this.$deletePinModal.one('hidden.bs.modal', function (){
      that.model.destroy();   
      that.trigger("remove", that);         
    });
  },
  
  showEditPinModal: function () {
    this.$editPinModal.modal();
  },
  
  hideEditPinModal: function (event) {
    event.preventDefault();
    this.$editPinModal.modal('hide');
    var that = this;
    this.$editPinModal.one('hidden.bs.modal', function () {
      that.$deletePinModal.modal();  
    });
  },
  
  showImageModal: function () {
    this.$pinZoomModal.modal();
  },
  
  hideImageModal: function () {
    this.$pinZoomModal.modal('hide');
    var that = this;
    this.$pinZoomModal.one('hidden.bs.modal', function () {
      window.location.hash = "/users/" + that.model.get('pinner_id') + "/boards/" + that.model.get('board_id');  
    });
  },
  
  editPin: function (event) {
    event.preventDefault();
    this.$editPinModal.modal('hide');
  
    var formData = $(event.currentTarget).serializeJSON();
    var that = this;
    this.$editPinModal.one('hidden.bs.modal', function (){
      that.model.set({
        description: formData.pin.description
      });
      that.model.save();
    });
  },
  
  redirectUser: function () {
    debugger
    window.location.hash = "/users/" + this.model.get('pinner_id') + "/boards/" + this.model.get('board_id');  
  }
});