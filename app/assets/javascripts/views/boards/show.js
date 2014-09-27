Pintrospective.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.createSubviews();
  },
  
  events: {
    "click button#board-follow-button": "followBoard"
  },
  
  createSubviews: function () {
    var pinIndex = new Pintrospective.Views.PinsIndex({
      model: this.model,
      collection: this.model.pins(),
      user: this.model.get('user_id')
    })
    this.addSubviewBefore('#pins', pinIndex);  
  },
  
  render: function () {
    var renderedContent = this.template({ 
      board: this.model,
      user: CURRENT_USER_ID
    });
    this.$el.html(renderedContent);
    this.attachSubviewsBefore();
    
    $('.pin-count').addClass('active');
    
    return this;  
  },
  
  followBoard: function (event) {
    event.preventDefault();
    var followee_board = new Pintrospective.Models.Follow({
      followable_id: this.model.id, 
      followable_type: 'Board'
    });
    followee_board.save({});
  },
  
  removePin: function (pinSubView) {
    this.removeSubview('#pins', pinSubView);
  }

});

