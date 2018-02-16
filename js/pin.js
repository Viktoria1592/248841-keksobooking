'use strict';

(function () {
	 window.pin = {
		 createPins: function(arrPinsData) {
  var fragmentPin = document.createDocumentFragment();

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
	 }
})();