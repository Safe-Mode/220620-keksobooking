'use strict';

(function () {
  var sortByDrag = function (container) {
    container.addEventListener('mousedown', function (evt) {
      var onContainerMouseUpEvt = function () {
        evt.target.style.outline = '';
        container.removeEventListener('mouseup', onContainerMouseUpEvt);
      };

      evt.target.style.outline = '2px solid #ff5635';
      container.addEventListener('mouseup', onContainerMouseUpEvt);
    });

    container.addEventListener('dragstart', function (evt) {
      var nextElement;
      var currentIndex;
      var nextIndex;

      var onContainerDragover = function (overEvt) {
        var photosEl = container.querySelectorAll('img');

        photosEl.forEach(function (it, i) {
          currentIndex = (it === evt.target) ? i : currentIndex;
          nextIndex = (it === overEvt.target) ? i : nextIndex;
        });

        if (overEvt.target.tagName.toLowerCase() === 'img') {
          nextElement = (nextIndex > currentIndex) ? overEvt.target.nextElementSibling : overEvt.target;
        }

        container.insertBefore(evt.target, nextElement);
      };

      var onContainerDragEnd = function () {
        evt.target.style.outline = '';

        container.removeEventListener('dragover', onContainerDragover);
        container.removeEventListener('dragend', onContainerDragEnd);
      };

      container.addEventListener('dragover', onContainerDragover);
      container.addEventListener('dragend', onContainerDragEnd);
    });
  };

  window.sort = sortByDrag;
})();
