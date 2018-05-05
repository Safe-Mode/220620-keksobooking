'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var STATE_COLOR = 'rgb(255, 86, 53)';

  var fileChooserEl = document.querySelector('.ad-form-header__input');
  var fileChooserBtn = document.querySelector('.ad-form-header__drop-zone');
  var previewEl = document.querySelector('.ad-form-header__preview img');
  var initColor = window.getComputedStyle(fileChooserBtn).borderColor;

  var setUserFile = function (file) {
    file = (!file) ? fileChooserEl.files[0] : file;
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewEl.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var toggleInitColor = function (options) {
    var currentColor = options.el.style[options.prop];

    options.el.style[options.prop] = (currentColor === options.initColor || currentColor === '') ? options.stateColor : options.initColor;
  };

  fileChooserEl.addEventListener('change', function () {
    setUserFile();
  });

  document.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  document.addEventListener('drop', function (evt) {
    evt.preventDefault();
  });

  fileChooserBtn.addEventListener('dragenter', function (evt) {
    toggleInitColor({
      el: evt.currentTarget,
      prop: 'borderColor',
      stateColor: STATE_COLOR,
      initColor: initColor
    });
  });

  fileChooserBtn.addEventListener('dragleave', function (evt) {
    toggleInitColor({
      el: evt.currentTarget,
      prop: 'borderColor',
      stateColor: STATE_COLOR,
      initColor: initColor
    });
  });

  fileChooserBtn.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];

    setUserFile(file);
    toggleInitColor({
      el: evt.currentTarget,
      prop: 'borderColor',
      stateColor: STATE_COLOR,
      initColor: initColor
    });
  });
})();
