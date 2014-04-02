// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.MessageView = (function(_super) {

    __extends(MessageView, _super);

    function MessageView() {
      return MessageView.__super__.constructor.apply(this, arguments);
    }

    MessageView.prototype.events = {
      "click": "send_message"
    };

    MessageView.prototype.initialize = function(attributes) {};

    MessageView.prototype.render = function() {
      this.$el.html(HAML["message"]({
        message_view_model: this.model
      }));
      return this;
    };

    MessageView.prototype.send_message = function(event) {
      chrome.extension.getBackgroundPage().sendMessage(window.relater_to_send.channel_id, this.model.msg_id, false, "");
      return window.close();
    };

    return MessageView;

  })(Backbone.View);

}).call(this);
