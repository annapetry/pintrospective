Pintrospective.Collections.Users = Backbone.Collection.extend({
  model: Pintrospective.Models.User,
  
  url: 'api/users',
  
  getOrFetch: function (id) {
    var users = this;
    var user = this.get(id);
    
    if (!user) {
      user = new Pintrospective.Models.User({ id: id });
      user.fetch({
        success: function () {
          users.add(user);
        }
      });
    } else {
      user.fetch();
    }
    
    return user;
  }
});

Pintrospective.Collections.users = new Pintrospective.Collections.Users;