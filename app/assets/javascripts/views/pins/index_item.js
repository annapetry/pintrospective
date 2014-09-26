Pintrospective.Views.PinsIndexItem = Backbone.View.extend({
  template: JST['pins/index_item'],
  
  events: {
    "click button#remove-pin": "removePin"
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
});