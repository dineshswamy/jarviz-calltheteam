// Generated by CoffeeScript 1.6.1
(function() {
  var notificationandTTS, sender, sender_message;

  window.base_url = "http://lit-refuge-2289.herokuapp.com";

  window.relater_send_queue = [];

  window.message_to_send = null;

  window.relater_collection = null;

  sender = null;

  window.logged_in_user = null;

  sender_message = null;

  window.messages = null;

  window.transformed_message = null;

  window.is_custom_message = false;

  window.custom_message = "";

  window.opened_windows = {};

  window.relater_threads = {};

  window.messages_with_options = [];

  window.options_for_message = [];

  window.popup_params = {};

  window.background_message_recieved = null;

  window.openWindow = function(attributes) {
    if (attributes !== null) {
      window.background_message_recieved = {
        "recieved_message": attributes
      };
    }
    console.log("recieved_message");
    console.log(attributes);
    chrome.runtime.sendMessage({
      "recieved_message": attributes
    }, null);
    return chrome.app.window.create('../popup.html', {
      id: 'app-window',
      bounds: {
        width: 600,
        height: 600,
        left: 100,
        top: 100
      },
      minWidth: 800,
      minHeight: 650
    }, null);
  };

  chrome.app.runtime.onLaunched.addListener(function() {
    return window.openWindow(null);
  });

  chrome.app.window.onClosed.addListener(function() {
    console.log("reset the values");
    return window.is_window_opened = false;
  });

  chrome.pushMessaging.onMessage.addListener(function(recieved_message) {
    console.log(recieved_message);
    return window.openWindow(recieved_message);
  });

  window.addSenderToQueue = function(relater) {
    return window.relater_send_queue.push(relater);
  };

  notificationandTTS = function(notification_title, notification_message) {
    var notification;
    notification = webkitNotifications.createNotification(null, notification_title, notification_message);
    return notification.show();
  };

  window.openOptionsPopupwindow = function(sender) {
    var options;
    if (opened_windows[sender.id] === null || opened_windows[sender.id] === void 0) {
      options = {
        url: '../options_popup.html',
        type: "popup",
        frame: "none",
        width: 300,
        height: 600
      };
      return window.options_window_id = chrome.windows.create(options, function(this_window) {
        return setMessageOptions(this_window, sender);
      });
    } else {
      return setMessageOptions(null, sender);
    }
  };

  window.sendBroadcastMessage = function() {
    return chrome.runtime.sendMessage(window.broadcast_message, null);
  };

}).call(this);
