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

  this.RelaterView = (function(_super) {

    __extends(RelaterView, _super);

    function RelaterView() {
      return RelaterView.__super__.constructor.apply(this, arguments);
    }

    RelaterView.prototype.tagName = 'li';

    RelaterView.prototype.className = 'available_contact';

    RelaterView.prototype.events = {
      'click': 'sendRelaterModel'
    };

    RelaterView.prototype.initialize = function(attributes) {};

    RelaterView.prototype.render = function() {
      this.$el.html(HAML["relater"]({
        user_model: this.model
      }));
      return this;
    };

    RelaterView.prototype.sendRelaterModel = function(event) {
      return chrome.runtime.sendMessage({
        "user_to_send": this.model
      });
    };

    return RelaterView;

  })(Backbone.View);

  this.RelatersCollectionView = (function(_super) {

    __extends(RelatersCollectionView, _super);

    function RelatersCollectionView() {
      return RelatersCollectionView.__super__.constructor.apply(this, arguments);
    }

    RelatersCollectionView.prototype.tagName = 'ul';

    RelatersCollectionView.prototype.render = function() {
      var relater, users_model, _i, _len, _ref;
      _ref = this.collection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        users_model = _ref[_i];
        relater = new RelaterView({
          "model": users_model
        });
        this.$el.append(relater.render().$el);
      }
      return this;
    };

    return RelatersCollectionView;

  })(Backbone.View);

  this.Message = (function(_super) {

    __extends(Message, _super);

    function Message() {
      return Message.__super__.constructor.apply(this, arguments);
    }

    Message.prototype.initialize = function(attributes) {
      this.msg_id = attributes.msg_id;
      this.user_message = attributes.user_message;
      return this.transform_pattern = attributes.transform_pattern;
    };

    return Message;

  })(Backbone.Model);

  this.MessageCollection = (function(_super) {

    __extends(MessageCollection, _super);

    function MessageCollection() {
      return MessageCollection.__super__.constructor.apply(this, arguments);
    }

    MessageCollection.prototype.model = Message;

    MessageCollection.prototype.url = chrome.extension.getBackgroundPage().base_url;

    MessageCollection.prototype.initialize = function(attributes) {
      return this.url = this.url + "/messages.json";
    };

    return MessageCollection;

  })(Backbone.Collection);

  this.MessageView = (function(_super) {

    __extends(MessageView, _super);

    function MessageView() {
      return MessageView.__super__.constructor.apply(this, arguments);
    }

    MessageView.prototype.tagName = 'li';

    MessageView.prototype.className = 'messages_li_element';

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
      return chrome.runtime.sendMessage({
        "message_to_send": this.model
      }, null);
    };

    return MessageView;

  })(Backbone.View);

  this.MessageCollectionView = (function(_super) {

    __extends(MessageCollectionView, _super);

    function MessageCollectionView() {
      return MessageCollectionView.__super__.constructor.apply(this, arguments);
    }

    MessageCollectionView.prototype.tagName = 'ul';

    MessageCollectionView.prototype.className = 'messages_container';

    MessageCollectionView.prototype.initialize = function(attributes) {
      var messages;
      messages = new Messages();
      return messages.init();
    };

    MessageCollectionView.prototype.render = function(message_models) {
      var relater;
      relater = new MessageView({
        "model": message_models
      });
      return this.$el.append(relater.render().$el);
    };

    MessageCollectionView;

    return MessageCollectionView;

  })(Backbone.View);

}).call(this);
