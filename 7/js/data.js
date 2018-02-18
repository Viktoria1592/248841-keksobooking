'use strict';

(function () {

  var domicileSpecification = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var domiciles = ['flat', 'house', 'bungalo'];
  var checkinCheckout = ['12:00', '13:00', '14:00'];
  var advantages = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  function getRandomFeatures(arrAdvantages) {
    var lengthRandom = Math.floor(Math.random() * arrAdvantages.length) + 1;
    var advantagesRandom = [];
    for (var j = 0; j < lengthRandom; j++) {
      advantagesRandom[j] = arrAdvantages[Math.floor(Math.random() * arrAdvantages.length)];
      arrAdvantages.splice(arrAdvantages.indexOf(advantagesRandom[j]), 1);
    }
    return advantagesRandom;
  }

  function shufflingComparator() {
    return Math.random() - 0.5;
  }


  function setarr() {

    var arr = [];

    for (var i = 0; i < 8; i++) {
      var locationX = 300 + Math.floor(Math.random() * 600);
      var locationY = 150 + Math.floor(Math.random() * 350);
      arr[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png',
        },
        'offer': {
          'title': domicileSpecification[i],
          'address': locationX + ', ' + locationY,
          'price': 1000 + Math.floor(Math.random() * 999000),
          'type': domiciles[Math.floor(Math.random() * domiciles.length)],
          'rooms': 1 + Math.floor(Math.random() * 5),
          'guests': 1 + Math.floor(Math.random() * 8),
          'checkin': checkinCheckout[Math.floor(Math.random() * checkinCheckout.length)],
          'checkout': checkinCheckout[Math.floor(Math.random() * checkinCheckout.length)],
          'features': getRandomFeatures(advantages),
          'description': '',
          'photos': photos.slice().sort(shufflingComparator)
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      };
    }
    return arr;
  }

  window.data = {
    setarr: setarr
  };
})();
