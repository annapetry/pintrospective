Pintrospective.Views.PinsIndex = Backbone.CompositeView.extend({
  template: JST['pins/index'],
  
  initialize: function (options) {
    this.listenTo(this.collection, "sync add remove", this.render);
    this.listenTo(this.collection, "add", this.addPin);
    if (this.model) {
      this.listenTo(this.model, "change:user_id", this.addFormView)
    }
    this.createSubviews();
    this.addFormView();
  },
  
  createSubviews: function () {
    var that = this;
    this.collection.each(function (pin) {
      that.addPin(pin);
    });
  },
 
  // Pass in this.model as the board
  addFormView: function () {
    if (this.model && this.model.get('user_id') == CURRENT_USER_ID) {
      var formView = new Pintrospective.Views.NewPin({
        model: new Pintrospective.Models.Pin(),
        board: this.model,
        collection: this.model.pins()
      });
      this.addSubviewBefore('#pin-items', formView);
    }
  },
  
  addPin: function (pin) {
    var indexItem = new Pintrospective.Views.PinsIndexItem({ 
      model: pin
    });
    this.addSubviewBefore('#pin-items', indexItem);
    this.listenTo(indexItem, "remove", this.removePin);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      pins: this.collection
    });
    this.$el.html(renderedContent);
    this.addFormView();
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