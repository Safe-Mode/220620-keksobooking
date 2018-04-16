'use strict';

(function () {
  window.Util = {
    RADIX_TEN: 10,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

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

    isEscPressed: function (evt) {
      return evt.keyCode === this.ESC_KEYCODE;
    },

    isEnterPressed: function (evt) {
      return evt.keyCode === this.ENTER_KEYCODE;
    }
  };
})();
