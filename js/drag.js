'use strict';

(function () {
  var STYLE_DIMENSION = 'px';
  var MAIN_PIN_LINK_HEIGHT = 20;

  var EdgeCoord = {
    TOP: 150,
    BOTTOM: 500
  };

  window.drag = function (el, container, cb) {
    var pinImgEl = el.querySelector('img');

    el.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var target = evt.currentTarget;

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMainPinMouseMove = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var leftPos = target.offsetLeft - shift.x;
        var topPos = target.offsetTop - shift.y;
        var rightEdge = container.offsetWidth;
        var bottomEdge = (container.offsetHeight <= EdgeCoord.BOTTOM) ? container.offsetHeight : EdgeCoord.BOTTOM;
        var pinWidth = el.offsetWidth;
        var pinHeight = pinImgEl.offsetHeight + MAIN_PIN_LINK_HEIGHT;

        leftPos = (leftPos < 0) ? 0 : leftPos;
        leftPos = (leftPos + pinWidth > rightEdge) ? rightEdge - pinWidth : leftPos;
        topPos = (topPos < EdgeCoord.TOP) ? EdgeCoord.TOP : topPos;
        topPos = (topPos + pinHeight > bottomEdge) ? bottomEdge - pinHeight : topPos;

        target.style.left = leftPos + STYLE_DIMENSION;
        target.style.top = topPos + STYLE_DIMENSION;
        cb();
      };

      var onMainPinMouseUp = function () {
        cb();
        container.removeEventListener('mousemove', onMainPinMouseMove);
        document.removeEventListener('mouseup', onMainPinMouseUp);
      };

      container.addEventListener('mousemove', onMainPinMouseMove);
      document.addEventListener('mouseup', onMainPinMouseUp);
    });
  };
})();
