Pintrospective.Views.PinsIndex = Backbone.CompositeView.extend({
  template: JST['pins/index'],
  
  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.render);
    this.listenTo(this.collection, "add", this.addPin);
    
    this.createSubviews();
    this.addFormView();
  },
  
  createSubviews: function () {
    var that = this;
    this.collection.each(function (pin) {
      that.addPin(pin);
    });
  },
  
  addFormView: function () {
    var formView = new Pintrospective.Views.NewPin({ 
      model: this.model, 
      collection: this.model.pins() 
    });
    this.addSubview('#pin-items', formView);
  },
  
  addPin: function (pin) {
    var indexItem = new Pintrospective.Views.PinsIndexItem({ model: pin });
    this.addSubview('#pin-items', indexItem);
    this.listenTo(indexItem, "remove", this.removePin);
    // this.render(); // thought this would remove the grey screen
  },
  
  render: function () {
    var renderedContent = this.template({ 
      pins: this.collection
    });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    $('.pin-count').addClass('active');

    var that = this;
    setTimeout(function(){
      var $container = that.$el.find('#pin-items').isotope({
        itemSelector: '.index-items',
      }); 
      // layout Isotope again after all images have loaded
      $container.imagesLoaded( function() {
        $container.isotope('layout');
      });
    }, 0);
    
    
    return this;
  },
  
  removePin: function (pinSubView) {
    this.removeSubview('#pin-items', pinSubView);
  }
});