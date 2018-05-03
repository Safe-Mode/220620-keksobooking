'use strict';

(function () {
  var pinTemplateEl = document.querySelector('template')
      .content
      .querySelector('.map__pin');
  var pinsContainerEl = document.querySelector('.map__pins');

  var getPins = function (data) {
    var pins = [];

    data.forEach(function (item) {
      var pin = new window.Pin(item);
      pins.push(pin);
    });

    return pins;
  };

  var renderPin = function (data) {
    var pinEl = pinTemplateEl.cloneNode(true);
    var pinImgEl = pinEl.querySelector('img');
    var pinWidth = pinImgEl.width;
    var pinHeight = pinImgEl.height;

    pinImgEl.src = data.src;
    pinImgEl.alt = data.alt;
    pinEl.style.left = data.location.x + pinWidth / 2 + 'px';
    pinEl.style.top = data.location.y + pinHeight + 'px';

    return pinEl;
  };

  var appendElements = function (data, count) {
    var fragment = document.createDocumentFragment();
    var pins = getPins(data);
    var cardEl = document.querySelector('.map__card');

    count = (count > data.length) ? data.length : count;

    for (var i = 0; i < count; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }

    if (cardEl) {
      window.util.removeElement(cardEl);
    }

    window.util.drainContainer(pinsContainerEl, '.map__pin:not(.map__pin--main)');
    pinsContainerEl.appendChild(fragment);
  };

  window.renderPins = appendElements;
})();
