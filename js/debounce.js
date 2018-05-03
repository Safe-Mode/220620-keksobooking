'use strict';

(function () {
  var INTERVAL = 500;

  var lastTimeout;

  window.debounce = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(callback, INTERVAL);
  };
})();
