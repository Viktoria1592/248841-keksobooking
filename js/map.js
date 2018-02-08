'use strict';

function setarr() {
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

  function getRandomPhotos(a, b) {
    return Math.random() - 0.5;
  }

  var arr = [];

  for (var i = 0; i < 8; i++) {
    arr[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': domicileSpecification[i],
        'address': '{{location.x}}, {{location.y}}',
        'price': 1000 + Math.floor(Math.random() * 999000),
        'type': domiciles[Math.floor(Math.random() * domiciles.length)],
        'rooms': 1 + Math.floor(Math.random() * 5),
        'guests': 1 + Math.floor(Math.random() * 8),
        'checkin': checkinCheckout[Math.floor(Math.random() * checkinCheckout.length)],
        'checkout': checkinCheckout[Math.floor(Math.random() * checkinCheckout.length)],
        'features': getRandomFeatures(advantages),
        'description': '',
        'photos': photos.sort(getRandomPhotos)
      },
      'location': {
        'x': 300 + Math.floor(Math.random() * 600),
        'y': 150 + Math.floor(Math.random() * 350)
      }
    };
  }
  return arr;
}

var WIDTH_PHOTO = 210;
var HEIGHT_PHOTO = 140;
var pinsData = setarr();
var map = document.querySelector('.map');
var commonTemplate = document.querySelector('template');
var pinAvatar = commonTemplate.content.querySelector('.map_pin_avatar');
var fragmentPin = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');

function createPin(arrPinsData, arrFragmentPin) {
  for (var i = 0; i < pinsData.length; i++) {
    var pin = pinAvatar.cloneNode(true);
    pin.style.left = arrPinsData[i].location.x + 20 + 'px';
    pin.style.top = arrPinsData[i].location.y + 44 + 'px';
    pin.children[0].src = arrPinsData[i].author.avatar;
    arrFragmentPin.appendChild(pin);
  }
  return fragmentPin;
}
mapPins.appendChild(createPin(pinsData, fragmentPin));

var mapCard = commonTemplate.content.querySelector('.map__card');
var fragmentCard = document.createDocumentFragment();
var card = mapCard.cloneNode('true');

function creatfeatures(featuresPinsDataArr, cardfeatures) {
  var popupFeatures = cardfeatures.querySelector('.popup__features');
  while (popupFeatures.firstChild) {
    popupFeatures.removeChild(popupFeatures.firstChild);
  }
  var arrFeatures = featuresPinsDataArr.offer.features;
  for (var i = 0; i < arrFeatures.length; i++) {
    var li = document.createElement('li');
    li.className = 'feature feature--' + arrFeatures[i];
    popupFeatures.appendChild(li);
  }
  return popupFeatures;
}

function creatFotos(cardPictures, fotosPinsData) {
  var popupPictures = cardPictures.querySelector('.popup__pictures');
  while (popupPictures.firstChild) {
    popupPictures.removeChild(popupPictures.firstChild);
  }
  var arrPictures = fotosPinsData.offer.photos;
  for (var i = 0; i < arrPictures.length; i++) {
    var li = document.createElement('li');
    var img = document.createElement('img');
    img.src = arrPictures[i];
    img.style.width = WIDTH_PHOTO + 'px';
    img.style.height = HEIGHT_PHOTO + 'px';
    li.appendChild(img);
    popupPictures.appendChild(li);
  }
  return popupPictures;
}

function createCard(pinsDataArr, fragmentCardAvatar, cardPopup) {
  cardPopup.children[0].src = pinsDataArr.author.avatar;
  cardPopup.children[2].textContent = pinsDataArr.offer.title;
  cardPopup.children[3].children[0].textContent = pinsDataArr.offer.address;
  var popupPrice = cardPopup.querySelector('.popup__price');
  popupPrice.textContent = pinsDataArr.offer.price + '&#x20bd;/ночь';
  var typeOfHousing = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };
  cardPopup.children[5].textContent = typeOfHousing[pinsDataArr.offer.type];
  cardPopup.children[6].textContent = pinsDataArr.offer.rooms + ' комнаты для ' + pinsDataArr.offer.guests + ' гостей';
  cardPopup.children[7].textContent = 'Заезд после ' + pinsDataArr.offer.checkin + ', выезд до ' + pinsDataArr.offer.checkout;
  creatfeatures(pinsDataArr, cardPopup);
  cardPopup.children[9].textContent = pinsDataArr.offer.description;
  creatFotos(cardPopup, pinsDataArr);
  fragmentCardAvatar.appendChild(cardPopup);
  return fragmentCardAvatar;
}

var mapFiltersContainer = map.querySelector('.map__filters-container');
mapFiltersContainer.before(createCard(pinsData[0], fragmentCard, card));

map.classList.remove('.map--faded');
