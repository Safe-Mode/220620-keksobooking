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

  var appendElements = function (data) {
    var fragment = document.createDocumentFragment();
    var pins = getPins(data);

    pins.forEach(function (pin) {
      fragment.appendChild(renderPin(pin));
    });

    pinsContainerEl.appendChild(fragment);
  };

  window.renderPins = appendElements;
})();
