'use strict';

(function () {
  window.Util = {
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
    }
  };
})();
