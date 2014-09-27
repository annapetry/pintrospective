Pintrospective.Models.Board = Backbone.Model.extend({
  // urlRoot: "api/users/" + CURRENT_USER_ID + "/boards",
  
  pins: function () {
    if (this._pins) {
      return this._pins;
    } else {
      this._pins = new Pintrospective.Collections.Pins([], { board: this });
      return this._pins;
    }
  },
  //
  // followers: function () {
  //   if (this._followers) {
  //     return this._followers;
  //   } else {
  //     this._followers = new Pintrospective.Collections.Followers([], {
  //       board: this
  //     });
  //     return this._followers;
  //   }
  // },
  
  parse: function (response) {
    if (response.pins) {
      this.pins().set(response.pins, { parse: true });
      delete response.pins;
    // } else if (response.followers) {
//       this.followers().set(response.followers { parse: true });
//       delete response.followers;
    }
    return response;
  }
});