Pintrospective.Models.Board = Backbone.Model.extend({
  urlRoot: 'api/boards',
  
  pins: function () {
    if (this._pins) {
      return this._pins;
    } else {
      this._pins = new Pintrospective.Collections.Pins([], { board: this });
      return this._pins;
    }
  },
  
  parse: function (response) {
    if (response.pins) {
      this.pins().set(response.pins, { parse: true });
      delete response.pins;
    }
    return response;
  }
});