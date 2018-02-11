'use strict';

var WIDTH_PHOTO = 70;
var HEIGHT_PHOTO = 50;
var SIZE_PIN_X = 65;
var SIZE_PIN_Y = 65;

var map = document.querySelector('.map');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var mapPins = document.querySelector('.map__pins');
var commonTemplate = document.querySelector('template');
var pinAvatar = commonTemplate.content.querySelector('.map_pin_avatar');
var mapCard = commonTemplate.content.querySelector('.map__card');
var isCardShown = false;


var typeOfHousing = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом'
};

var domicileSpecification = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var domiciles = ['flat', 'house', 'bungalo'];
var checkinCheckout = ['12:00', '13:00', '14:00'];
var advantages = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var pinsData;

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

function createPins(arrPinsData) {
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

function createCard(pinsDataArr, cardPopup) {
  var fragmentCard = document.createDocumentFragment();
  cardPopup.children[0].src = pinsDataArr.author.avatar;
  cardPopup.children[2].textContent = pinsDataArr.offer.title;
  cardPopup.children[3].children[0].textContent = pinsDataArr.offer.address;
  var popupPrice = cardPopup.querySelector('.popup__price');
  popupPrice.textContent = pinsDataArr.offer.price + '&#x20bd;/ночь';

  cardPopup.children[5].textContent = typeOfHousing[pinsDataArr.offer.type];
  cardPopup.children[6].textContent = pinsDataArr.offer.rooms + ' комнаты для ' + pinsDataArr.offer.guests + ' гостей';
  cardPopup.children[7].textContent = 'Заезд после ' + pinsDataArr.offer.checkin + ', выезд до ' + pinsDataArr.offer.checkout;
  creatfeatures(pinsDataArr, cardPopup);
  cardPopup.children[9].textContent = pinsDataArr.offer.description;
  creatFotos(cardPopup, pinsDataArr);
  fragmentCard.appendChild(cardPopup);
  return fragmentCard;
}

function onMapPinsClick(evt) {
  for (var i = 0; i < evt.path.length; i++) {
    if (evt.path[i].classList && evt.path[i].classList.contains('map__pin') && !evt.path[i].classList.contains('map__pin--main')) {

      if (isCardShown) {
        document.querySelector('.map__card ').remove();
      }

      isCardShown = true;

      var adCard = createCard(pinsData[evt.path[i].dataset.index], mapCard.cloneNode('true'));
      mapFiltersContainer.before(adCard);
    }
  }
}

function removeMapFaded() {
  map.classList.remove('map--faded');
}

function removeNoticeFormDisabled() {
  var noticeForm = document.querySelector('.notice__form');
  noticeForm.classList.remove('notice__form--disabled');
}

function removeDisable() {
  var fieldset = document.querySelectorAll('fieldset');
  for (var i = 0; i < fieldset.length; i++) {
    if (fieldset[i].hasAttribute('disabled')) {
      fieldset[i].removeAttribute('disabled');
    }
  }
}

function init() {
  pinsData = setarr();
  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mouseup', function (evt) {
    removeMapFaded();
    removeNoticeFormDisabled();
    removeDisable();
    mapPins.appendChild(createPins(pinsData));

    var address = document.getElementById('address');
    address.value = (evt.clientX + SIZE_PIN_X / 2) + ', ' + (evt.clientY + SIZE_PIN_Y);

    mapPins.addEventListener('click', onMapPinsClick);
  });
}

init();
