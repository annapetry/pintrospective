Pintrospective.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',
  
  boards: function () {
    if (this._boards) {
      return this._boards;
    } else {
      this._boards = new Pintrospective.Collections.Boards([], {
         user: this 
       });
      return this._boards;
    }
  },
  
  followers: function () {
    if (this._followers) {
      return this._followers;
    } else {
      this._followers = new Pintrospective.Collections.Follows([], {
        board: this
      });
      return this._followers;
    }
  },
  
  parse: function (response) {
    if (response.boards) {
      this.boards().set(response.boards, { parse: true });
      delete response.boards;
    }
    if (response.followers) {
      this.followers().set(response.followers, { parse: true });
      delete response.followers;
    }
    return response;
  }
});