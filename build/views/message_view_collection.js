// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.MessageCollectionView = (function(_super) {

    __extends(MessageCollectionView, _super);

    function MessageCollectionView() {
      return MessageCollectionView.__super__.constructor.apply(this, arguments);
    }

    MessageCollectionView.prototype.tagName = "div";

    MessageCollectionView.prototype.className = "list-group";

    MessageCollectionView.prototype.initialize = function(attributes) {};

    MessageCollectionView.prototype.render = function() {
      var custom_message, message_models, relater, _i, _len, _ref;
      _ref = this.collection;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        message_models = _ref[_i];
        console.log(message_models);
        relater = new MessageView({
          "model": message_models
        });
        this.$el.append(relater.render().$el);
      }
      custom_message = new CustomMessageView();
      this.$el.append(custom_message.render());
      return this;
    };

    return MessageCollectionView;

  })(Backbone.View);

}).call(this);