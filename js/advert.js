'use strict';

(function () {
  window.Advert = function (data) {
    this.author = {
      avatar: IMAGE_PATH + _indexNum + EXTENSION
    };

    this.location = {
      x: window.Util.getRandomInt(MIN_COORD_X, MAX_COORD_X),
      y: window.Util.getRandomInt(MIN_COORD_Y, MAX_COORD_Y)
    };

    this.offer = {
      title: OFFER_TITLES[index],
      address: this.location.x + ', ' + this.location.y,
      price: window.Util.getRandomInt(MIN_PRICE, MAX_PRICE),
      type: TYPES[window.Util.getRandomInt(0, TYPES.length)],
      rooms: window.Util.getRandomInt(MIN_ROOMS, MAX_ROOMS),
      guests: window.Util.getRandomInt(MIN_ROOMS, MAX_ROOMS),
      checkin: CHECKS[window.Util.getRandomInt(0, CHECKS.length)],
      checkout: CHECKS[window.Util.getRandomInt(0, CHECKS.length)],
      features: [],
      description: '',
      photos: []
    };
  };
})();
