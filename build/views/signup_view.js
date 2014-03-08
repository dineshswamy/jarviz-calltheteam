// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SignupView = (function(_super) {
    var complete_registration, onauthorized, onresultcomplete;

    __extends(SignupView, _super);

    function SignupView() {
      return SignupView.__super__.constructor.apply(this, arguments);
    }

    SignupView.prototype.tagName = 'div';

    SignupView.prototype.className = 'sign_up';

    SignupView.prototype.events = {
      'click button#google_sign_in': 'register'
    };

    SignupView.prototype.initialize = function() {
      return console.log("signup view initialized");
    };

    SignupView.prototype.register = function(event) {
      event.preventDefault();
      return chrome.pushMessaging.getChannelId(false, complete_registration);
    };

    complete_registration = function(google_chrome_channel_id) {
      var email_id_value, new_user;
      email_id_value = $("#user_email_id").val();
      new_user = new User({
        email_id: email_id_value,
        channel_id: google_chrome_channel_id.channelId,
        name: 'sample_username'
      });
      return new_user.save({}, {
        success: function(model) {
          console.log(model);
          if (model.get("status") === "success") {
            new_user.set({
              "id": model.get("user_id")
            });
            $(".status").html("Registered successfully");
            localStorage["registered"] = true;
            return localStorage["registered_user_id"] = model.get("user_id");
          } else if (model.get("status") === "failure") {
            $(".status").html("For some reasons registration failed.Please try again later");
            localStorage["registered"] = false;
            return localStorage["registered_user_id"] = null;
          } else {
            $(".status").html(model.get("status"));
            localStorage["registered"] = false;
            return localStorage["registered_user_id"] = null;
          }
        },
        error: function() {
          return $(".status").html("For some reasons registration failed.Please try again later");
        }
      });
    };

    SignupView.prototype.render = function() {
      this.$el.html(HAML['signup']());
      return this;
    };

    onauthorized = function() {
      var REQUEST, URL;
      URL = "https://www.googleapis.com/auth/userinfo#email";
      REQUEST = {
        "method": "GET",
        "parameters": {
          "alt": "json"
        }
      };
      return oauth.sendSignedRequest(URL, onresultcomplete, REQUEST);
    };

    onresultcomplete = function(response, xhr) {
      console.log("response " + response);
      return console.log("xhr " + xhr);
    };

    return SignupView;

  })(Backbone.View);

}).call(this);