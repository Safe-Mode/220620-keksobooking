'use strict';

(function () {
  window.Card = function (data) {
    this.author = {
      avatar: data.author.avatar
    };

    this.offer = {
      title: data.offer.title,
      address: data.offer.address,
      price: data.offer.price,
      type: data.offer.type,
      rooms: data.offer.rooms,
      guests: data.offer.guests,
      checkin: data.offer.checkin,
      checkout: data.offer.checkout,
      features: data.offer.features,
      description: data.offer.description,
      photos: data.offer.photos
    };
  };
})();
