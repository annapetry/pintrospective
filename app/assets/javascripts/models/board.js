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
    if (response.pin_urls) {
      response.pin_urls = _.compact(response.pin_urls);      
    }
    return response;
  }
});