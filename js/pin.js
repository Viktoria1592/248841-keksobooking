'use strict';

(function () {

  function createPins(arrPinsData) {
    var fragmentPin = document.createDocumentFragment();
    var commonTemplate = document.querySelector('template');
    var pinAvatar = commonTemplate.content.querySelector('.map_pin_avatar');

    for (var i = 0; i < arrPinsData.length; i++) {
      var pin = pinAvatar.cloneNode(true);
      pin.dataset.index = i;
      pin.style.left = arrPinsData[i].location.x + 20 + 'px';
      pin.style.top = arrPinsData[i].location.y + 44 + 'px';
      pin.children[0].src = arrPinsData[i].author.avatar;
      fragmentPin.appendChild(pin);
    }
    return fragmentPin;
  }
  window.pin = {
    createPins: createPins
  };
})();
