'use strict';

(function () {
  window.util = {
    RADIX_TEN: 10,

    Keycode: {
      ESC: 27,
      ENTER: 13
    },

    isEscPressed: function (evt) {
      return evt.keyCode === this.Keycode.ESC;
    },

    isEnterPressed: function (evt) {
      return evt.keyCode === this.Keycode.ENTER;
    },

    getRandomInt: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },

    shakeArray: function (arr) {
      var arrCopy = [].concat(arr);
      var shaked = [];

      while (arrCopy.length) {
        shaked.push(arrCopy.splice(this.getRandomInt(0, arrCopy.length - 1), 1)[0]);
      }

      return shaked;
    },

    cutArray: function (arr) {
      var arrCopy = [].concat(arr);
      arrCopy.length = this.getRandomInt(0, arrCopy.length);
      return arrCopy;
    },

    removeElement: function (el) {
      el.parentElement.removeChild(el);
    },

    drainContainer: function (container, selector) {
      var collection = (selector) ? container.querySelectorAll(selector) : container.querySelectorAll('*');
      var that = this;

      [].forEach.call(collection, function (it) {
        that.removeElement(it);
      });
    }
  };
})();
