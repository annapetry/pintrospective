Pintrospective.Views.UsersIndexItem = Backbone.View.extend({
  template: JST['users/index_item'],

  className: 'user-index-items',
  
  render: function(){
    var content = this.template({ user: this.model });
    this.$el.prepend(content);
    return this;
  }
});