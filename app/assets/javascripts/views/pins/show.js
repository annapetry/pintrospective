Pintrospective.Views.PinShow = Backbone.View.extend({
  template: JST["pins/show"],
  
  render: function () {
    var renderedContent = this.template({ pin: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});