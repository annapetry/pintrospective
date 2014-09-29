Pintrospective.Views.PinsIndexItem = Backbone.View.extend({
  template: JST['pins/index_item'],
  
  events: {
    "click button#remove-pin": "removePin",
    "click .pin-panel": 'showModal',
    "click #pinner-id": 'hideModal'
  },
  
  className: 'index-items',
  
  render: function(){
    var content = this.template({ pin: this.model });
    this.$el.prepend(content);
    return this;
  },
  
  removePin: function (event) {
    event.preventDefault();
    this.model.destroy(); 
    
    this.trigger("remove", this);
  },
  
  showModal: function () {
    this.$('.modal').modal();
  },
  
  hideModal: function () {
    this.$('.modal').modal('hide');
    var that = this;
    this.$('.modal').one('hidden.bs.modal', function () {
      window.location.hash = "/users/" + that.model.get('pinner_id');  
    });
  }
});