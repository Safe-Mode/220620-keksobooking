'use strict';

(function () {
  window.createData = function (initData) {
    var data = [];

    for (var i = 1; i <= initData.advertsLength; i++) {
      var index = i.toString();
      var indexNum = (index.length < initData.indexLength) ? ('0' + index) : index;
      var locationX = window.Util.getRandomInt(initData.minCoordX, initData.maxCoordX);
      var locationY = window.Util.getRandomInt(initData.minCoordY, initData.maxCoordY);

      var dataItem = {
        author: {
          avatar: initData.imagePath + indexNum + initData.extension
        },

        offer: {
          title: initData.offerTitles[i],
          address: locationX + ', ' + locationY,
          price: window.Util.getRandomInt(initData.minPrice, initData.maxPrice),
          type: initData.types[window.Util.getRandomInt(0, initData.types.length - 1)],
          rooms: window.Util.getRandomInt(initData.minRooms, initData.maxRooms),
          guests: window.Util.getRandomInt(initData.minRooms, initData.maxRooms),
          checkin: initData.checks[window.Util.getRandomInt(0, initData.checks.length - 1)],
          checkout: initData.checks[window.Util.getRandomInt(0, initData.checks.length - 1)],
          features: window.Util.cutArray(initData.features),
          description: '',
          photos: window.Util.shakeArray(initData.photos)
        },

        location: {
          x: locationX,
          y: locationY
        }
      };

      data.push(dataItem);
    }

    return data;
  };
})();
