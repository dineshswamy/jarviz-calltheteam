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
      this.url = window.base_url + "/calltheteam/register";
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

    User.prototype.set_attributes = function(attributes) {
      this.channel_id = attributes.channel_id;
      this.email = attributes.email;
      this.gender = attributes.gender;
      this.given_name = attributes.given_name;
      this.google_oauth_token = attributes.google_oauth_token;
      this.gplus_link = attributes.gplus_link;
      this.id = attributes.id;
      this.name = attributes.name;
      return this.picture = attributes.picture;
    };

    return User;

  })(Backbone.Model);

}).call(this);
