// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SignupView = (function(_super) {
    var complete_registration, save_user, set_profile_image;

    __extends(SignupView, _super);

    function SignupView() {
      return SignupView.__super__.constructor.apply(this, arguments);
    }

    SignupView.prototype.tagName = 'div';

    SignupView.prototype.className = 'sign_up form-group';

    SignupView.prototype.events = {
      'click a#google_sign_in': 'register'
    };

    SignupView.prototype.initialize = function(attributes) {
      this.call_back = attributes;
      return console.log("signup view initialized");
    };

    SignupView.prototype.register = function(event) {
      event.preventDefault();
      console.log("register clicked");
      return chrome.pushMessaging.getChannelId(false, complete_registration);
    };

    complete_registration = function(google_chrome_channel_id) {
      console.log(google_chrome_channel_id);
      return chrome.identity.getAuthToken({
        'interactive': true
      }, function(token) {
        return save_user(token, google_chrome_channel_id.channelId);
      });
    };

    SignupView.prototype.render = function() {
      this.$el.html(HAML['signup']());
      return this;
    };

    save_user = function(token, google_chrome_channel_id) {
      var new_user;
      new_user = new User({
        channel_id: google_chrome_channel_id,
        oauth_token: token
      });
      return new_user.save({}, {
        success: function(model) {
          var user_attributes;
          if (model.get("status") === "success") {
            user_attributes = model.get("user");
            console.log(model.get("user"));
            new_user.set_attributes(user_attributes);
            window.logged_in_user = new_user;
            set_profile_image(window.logged_in_user.picture);
            $("#profile_name").html("<h2>" + window.logged_in_user.name + "</h2>");
            $(".status").html("Registered successfully");
            chrome.storage.local.set({
              "registered": true,
              "registered_user": model
            }, null);
            return $("#sign_up_view_modal").modal('hide');
          } else if (model.get("status") === "failure") {
            $(".status").html("For some reasons registration failed.Please try again later");
            return chrome.storage.local.set({
              "registered": false,
              "registered_user": null
            }, null);
          } else {
            $(".status").html(model.get("status"));
            return chrome.storage.local.set({
              "registered": false,
              "registered_user": null
            }, null);
          }
        },
        error: function() {
          return $(".status").html("For some reasons registration failed.Please try again later");
        }
      });
    };

    set_profile_image = function(image_url) {
      var xhr;
      xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        var img, url;
        if (this.readyState === 4 && this.status === 200) {
          img = document.createElement('img')
          url = window.URL || window.webkitURL
          img.src = url.createObjectURL(this.response)
          return $("#profile_image_container").html(img)
        }
      };
      xhr.open('GET', image_url);
      xhr.responseType = 'blob';
      return xhr.send();
    };

    return SignupView;

  })(Backbone.View);

}).call(this);
