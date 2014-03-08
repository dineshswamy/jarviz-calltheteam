// Generated by CoffeeScript 1.6.1
(function() {

  this.Messages = (function() {

    function Messages() {}

    Messages.prototype.init = function() {
      var _this = this;
      this.version = 2;
      this.database = null;
      this.transaction = null;
      this.messages_url = chrome.extension.getBackgroundPage().base_url + "/messages.json";
      this.message_options_url = chrome.extension.getBackgroundPage().base_url + "/message_options.json";
      this.db_name = "calltheteam";
      this.request = indexedDB.open(this.db_name, this.version);
      this.request.onupgradeneeded = function(event) {
        var db, object_store_message_options, object_store_messages;
        db = event.target.result;
        if (db.objectStoreNames.contains("messages")) {
          db.deleteObjectStore("messages");
        }
        if (db.objectStoreNames.contains("message_options")) {
          db.deleteObjectStore("message_options");
        }
        object_store_messages = db.createObjectStore("messages", {
          keyPath: "id"
        });
        return object_store_message_options = db.createObjectStore("message_options", {
          keyPath: "id"
        });
      };
      this.request.onsuccess = function(event) {
        _this.database = event.target.result;
        return _this.getAllMessages();
      };
      return this.request.onerror = function(event) {
        return console.log("database_logging_error" + event.value);
      };
    };

    Messages.prototype.addMessage = function(object_to_store) {
      var request;
      if (this.database !== null) {
        this.transaction = this.database.transaction(["messages", "message_options"], "readwrite");
        this.store = this.transaction.objectStore("messages");
        request = this.store.put(object_to_store);
        request.onsuccess = function(event) {
          return console.log("message successfully written");
        };
        return request.onerror = function(event) {
          return console.log("insertion error");
        };
      }
    };

    Messages.prototype.addMessageOptions = function(object_to_store) {
      var request;
      if (this.database !== null) {
        this.transaction = this.database.transaction(["messages", "message_options"], "readwrite");
        this.store = this.transaction.objectStore("message_options");
        request = this.store.put(object_to_store);
        request.onsuccess = function(event) {
          return console.log("message options successfully written");
        };
        return request.onerror = function(event) {
          return console.log("insertion error");
        };
      }
    };

    Messages.prototype.fetch = function() {
      var _this = this;
      $.get(this.messages_url, function(data) {
        var messages, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          messages = data[_i];
          _results.push(_this.addMessage({
            "id": messages.msg_id,
            "user_message": messages.user_message,
            "transform_pattern": messages.transform_pattern
          }));
        }
        return _results;
      });
      return $.get(this.message_options_url, function(data) {
        var message_option, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          message_option = data[_i];
          _results.push(_this.addMessageOptions({
            "id": message_option.id,
            "message_id": message_option.message_id,
            "options_id": message_option.options_id
          }));
        }
        return _results;
      });
    };

    Messages.prototype.needToSync = function() {
      var now;
      return now = new Date();
    };

    Messages.prototype.getAllMessages = function() {
      var message_transactions, messages_objectstore, objectstore;
      chrome.extension.getBackgroundPage().messages_with_options = [];
      message_transactions = this.database.transaction(["message_options", "messages"]);
      objectstore = message_transactions.objectStore("message_options");
      messages_objectstore = message_transactions.objectStore("messages");
      return objectstore.openCursor().onsuccess = function(event) {
        var cursor, message_collection, message_collection_view;
        cursor = event.target.result;
        if (cursor) {
          return messages_objectstore.openCursor(cursor.value.message_id).onsuccess = function(event) {
            var messages_cursor;
            messages_cursor = event.target.result;
            chrome.extension.getBackgroundPage().messages_with_options.push(messages_cursor.value);
            return cursor["continue"]();
          };
        } else {
          message_collection = chrome.extension.getBackgroundPage().messages_with_options;
          message_collection_view = new MessageCollectionView({
            "collection": message_collection
          });
          return $("#messages_container").html(message_collection_view.render().el);
        }
      };
    };

    return Messages;

  })();

}).call(this);