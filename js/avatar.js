'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var STATE_COLOR = 'rgb(255, 86, 53)';
  var PHOTO_WIDTH = 50;
  var PHOTO_HEIGHT = 45;

  var avatarChooserEl = document.querySelector('.ad-form-header__input');
  var avatarChooserBtn = document.querySelector('.ad-form-header__drop-zone');
  var photoChooserEl = document.querySelector('.ad-form__input');
  var photoChooserBtn = document.querySelector('.ad-form__drop-zone');
  var previewEl = document.querySelector('.ad-form-header__preview img');
  var photoBoxEl = document.querySelector('.ad-form__photo');
  var initColor = window.getComputedStyle(avatarChooserBtn).borderColor;

  photoBoxEl.style.display = 'flex';
  photoBoxEl.style.flexWrap = 'wrap';
  photoBoxEl.style.padding = '12px 10px';
  photoBoxEl.style.paddingRight = '5px';
  photoBoxEl.style.paddingBottom = '5px';
  photoBoxEl.style.maxWidth = '235px';
  photoBoxEl.style.minWidth = window.getComputedStyle(photoBoxEl).width;
  photoBoxEl.style.width = 'auto';
  photoBoxEl.style.minHeight = window.getComputedStyle(photoBoxEl).height;
  photoBoxEl.style.height = 'auto';

  var createPreview = function () {
    var preview = document.createElement('img');

    preview.width = PHOTO_WIDTH;
    preview.height = PHOTO_HEIGHT;
    preview.style.display = 'block';
    preview.style.marginRight = '5px';
    preview.style.marginBottom = '5px';

    return preview;
  };

  var setUserFile = function (fileChooser, preview, file) {
    file = (!file) ? fileChooser.files[0] : file;
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var insertNewImage = function (fileChooser, file) {
    var preview = createPreview();

    setUserFile(fileChooser, preview, file);
    photoBoxEl.appendChild(preview);
  };

  var toggleInitColor = function (options) {
    var currentColor = options.el.style[options.prop];

    options.el.style[options.prop] = (currentColor === options.initColor || currentColor === '') ? options.stateColor : options.initColor;
  };

  avatarChooserEl.addEventListener('change', function (evt) {
    setUserFile(evt.currentTarget, previewEl);
  });

  photoChooserEl.addEventListener('change', function (evt) {
    insertNewImage(evt.currentTarget);
  });

  document.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  document.addEventListener('drop', function (evt) {
    evt.preventDefault();
  });

  avatarChooserBtn.addEventListener('dragenter', function (evt) {
    toggleInitColor({
      el: evt.currentTarget,
      prop: 'borderColor',
      stateColor: STATE_COLOR,
      initColor: initColor
    });
  });

  photoChooserBtn.addEventListener('dragenter', function (evt) {
    toggleInitColor({
      el: evt.currentTarget,
      prop: 'borderColor',
      stateColor: STATE_COLOR,
      initColor: initColor
    });
  });

  avatarChooserBtn.addEventListener('dragleave', function (evt) {
    toggleInitColor({
      el: evt.currentTarget,
      prop: 'borderColor',
      stateColor: STATE_COLOR,
      initColor: initColor
    });
  });

  photoChooserBtn.addEventListener('dragleave', function (evt) {
    toggleInitColor({
      el: evt.currentTarget,
      prop: 'borderColor',
      stateColor: STATE_COLOR,
      initColor: initColor
    });
  });

  avatarChooserBtn.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];

    setUserFile(evt.currentTarget, previewEl, file);
    toggleInitColor({
      el: evt.currentTarget,
      prop: 'borderColor',
      stateColor: STATE_COLOR,
      initColor: initColor
    });
  });

  photoChooserBtn.addEventListener('drop', function (evt) {
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];

    insertNewImage(evt.currentTarget, file);
    toggleInitColor({
      el: evt.currentTarget,
      prop: 'borderColor',
      stateColor: STATE_COLOR,
      initColor: initColor
    });
  });
})();
