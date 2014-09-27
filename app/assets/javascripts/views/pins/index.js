Pintrospective.Views.PinsIndex = Backbone.CompositeView.extend({
  template: JST['pins/index'],
  
  initialize: function (options) {
    this.user_id = options.user;
    this.listenTo(this.model.pins(), "sync add remove", this.render);
    this.listenTo(this.model.pins(), "add", this.addPin);
    
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
    if (this.user_id == CURRENT_USER_ID) {
      var formView = new Pintrospective.Views.NewPin({ 
        model: new Pintrospective.Models.Pin(), 
        board: this.model,
        collection: this.model.pins() 
      });
      this.addSubviewBefore('#pin-items', formView);
    }
  },
  
  addPin: function (pin) {
    var indexItem = new Pintrospective.Views.PinsIndexItem({ model: pin });
    this.addSubviewBefore('#pin-items', indexItem);
    this.listenTo(indexItem, "remove", this.removePin);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      pins: this.collection
    });
    this.$el.html(renderedContent);
    this.attachSubviewsBefore();
    
    $('.pin-count').addClass('active');

    var that = this;
    setTimeout(function(){
      var $container = that.$el.find('#pin-items').isotope({
        itemSelector: '.index-items',
        stamp: '.stamp'
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