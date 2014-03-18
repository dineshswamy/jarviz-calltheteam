// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.RelaterCollection = (function(_super) {

    __extends(RelaterCollection, _super);

    function RelaterCollection() {
      return RelaterCollection.__super__.constructor.apply(this, arguments);
    }

    RelaterCollection.prototype.model = User;

    RelaterCollection.prototype.url = chrome.extension.getBackgroundPage().base_url;

    RelaterCollection.prototype.initialize = function(attributes) {
      return this.url = chrome.extension.getBackgroundPage().base_url + "/user/" + attributes.user_id + "/contacts";
    };

    return RelaterCollection;

  })(Backbone.Collection);

}).call(this);
