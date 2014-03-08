// Generated by CoffeeScript 1.6.1
(function() {
  'use-strict';
  var callback_check_and_addRelator, check_and_addRelator, initialize_extension, loadRelators;

  initialize_extension = function() {
    return loadRelators(localStorage["registered_user_id"]);
  };

  document.addEventListener("DOMContentLoaded", initialize_extension);

  loadRelators = function(user_id) {
    var messages, relater_collection;
    relater_collection = new RelaterCollection({
      "user_id": user_id
    });
    relater_collection.fetch({
      success: function() {
        var relater_collection_view;
        relater_collection_view = new RelatersCollectionView({
          "collection": relater_collection
        });
        return $("#contacts_container").html(relater_collection_view.render().el);
      }
    });
    messages = new Messages();
    return messages.init();
  };

  check_and_addRelator = function(add_relator_id) {
    var data, url;
    data = {
      relator_id: add_relator_id
    };
    url = chrome.extension.getBackgroundPage().base_url + "/calltheteam/addcontact";
    return $.post(url, data, callback_check_and_addRelator);
  };

  callback_check_and_addRelator = function(response_data) {};

}).call(this);
