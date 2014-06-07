// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.RelatersCollectionView = (function(_super) {

    __extends(RelatersCollectionView, _super);

    function RelatersCollectionView() {
      return RelatersCollectionView.__super__.constructor.apply(this, arguments);
    }

    RelatersCollectionView.prototype.tagName = "div";

    RelatersCollectionView.prototype.className = "list-group";

    RelatersCollectionView.prototype.initialize = function() {
      this.collection.on("add", this.render, this);
      return this.collection.on("reset", this.render, this);
    };

    RelatersCollectionView.prototype.render = function() {
      var relater, users_model, _i, _len, _ref;
      console.log("called once");
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

    RelatersCollectionView.prototype.add = function(relater) {
      console.log("relater added");
      return this.collection.add(relater);
    };

    RelatersCollectionView.prototype.find_and_set_checked = function(relater_id) {};

    return RelatersCollectionView;

  })(Backbone.View);

}).call(this);
