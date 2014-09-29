Pintrospective.Models.Board = Backbone.Model.extend({
  
  pins: function () {
    if (this._pins) {
      return this._pins;
    } else {
      this._pins = new Pintrospective.Collections.Pins([], { board: this });
      return this._pins;
    }
  },

  followers: function () {
    debugger
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
    if (response.pins) {
      this.pins().set(response.pins, { parse: true });
      delete response.pins;
    }
    if (response.followers) {
      this.followers().set(response.followers, { parse: true });
      delete response.followers;
    }
    return response;
  },
  
  followed: function (current_user, board) {
    var result = false;
    board.followers().forEach(function (follower) {
      if (follower.get('user_id') == current_user) {
        console.log("in true");
        result = true;
      }
    });
    return result;
  }
});