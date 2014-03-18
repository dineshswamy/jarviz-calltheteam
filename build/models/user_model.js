// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.User = (function(_super) {

    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.initialize = function(attributes) {
      this.url = chrome.extension.getBackgroundPage().base_url + "/calltheteam/register";
      if (attributes.email_id) {
        this.email_id = attributes.email_id;
      }
      if (attributes.channel_id) {
        this.channel_id = attributes.channel_id;
      }
      if (attributes.name) {
        this.name = attributes.name;
      }
      if (attributes.id) {
        return this.id = attributes.id;
      }
    };

    User.prototype.defaults = {
      email_id: "sample@email.com",
      channel_id: "channel_id_sample"
    };

    return User;

  })(Backbone.Model);

}).call(this);
