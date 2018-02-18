'use strict';
(function () {
  function movePin() {
    var MIN_PIN_Y = 150;
    var MAX_PIN_Y = 500;

    window.map.mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.pageX,
        y: evt.pageY
      };
      var pinStartCoords = {
        x: window.map.mapPinMain.offsetLeft,
        y: window.map.mapPinMain.offsetTop
      };

      function onMapTokyoMousemove(moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.pageX,
          y: startCoords.y - moveEvt.pageY
        };
        var pinCoords = {
          x: pinStartCoords.x - shift.x,
          y: pinStartCoords.y - shift.y
        };

        if (pinCoords.x < 0) {
          pinCoords.x = 0;
        } else if (pinCoords.x > window.map.map.clientWidth) {
          pinCoords.x = window.map.map.clientWidth;
        }

        if (pinCoords.y < MIN_PIN_Y) {
          pinCoords.y = MIN_PIN_Y;
        } else if (pinCoords.y > MAX_PIN_Y) {
          pinCoords.y = MAX_PIN_Y;
        }

        window.map.mapPinMain.style.top = pinCoords.y + 'px';
        window.map.mapPinMain.style.left = pinCoords.x + 'px';
        window.map.address.value = pinCoords.x + ', ' + pinCoords.y;
      }

      function onMapTokyoMouseup(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMapTokyoMousemove);
        document.removeEventListener('mouseup', onMapTokyoMouseup);
      }

      document.addEventListener('mousemove', onMapTokyoMousemove);
      document.addEventListener('mouseup', onMapTokyoMouseup);
    });
  }
  window.pinMove = {
    movePin: movePin
  };
})();
