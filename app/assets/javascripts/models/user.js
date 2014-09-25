Pintrospective.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',
  
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
  
  parse: function (response) {
    if (response.boards) {
      this.boards().set(response.boards, { parse: true });
      delete response.boards;
    }
    return response;
  }
});