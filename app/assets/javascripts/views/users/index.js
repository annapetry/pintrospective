Pintrospective.Views.UsersIndex = Backbone.CompositeView.extend({
  template: JST['users/index'],
  
  initialize: function (options) {
    // collection is users
    this.listenTo(this.collection, "sync add", this.render);
    this.listenTo(this.collection, "add", this.addUser);
    
    this.createSubviews();
  },
  
  createSubviews: function () {
    var that = this;
    this.collection.each(function (user) {
      that.addUser(user);
    });
  },
  
  addUser: function (user) {

    var indexItem = new Pintrospective.Views.UsersIndexItem({ model: user });
    this.addSubviewBefore('#user-items', indexItem);
    this.listenTo(indexItem, "remove", this.removeUser);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      users: this.collection
    });
    this.$el.html(renderedContent);
    this.attachSubviewsBefore();
    
    var that = this;
    setTimeout(function(){
      var $container = that.$el.find('#user-items').isotope({
        itemSelector: '.user-index-items'
      }); 
      // layout Isotope again after all images have loaded
      $container.imagesLoaded( function() {
        $container.isotope('layout');
      });
    }, 0);
    
    return this;
  }
});