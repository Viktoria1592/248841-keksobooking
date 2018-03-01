'use strict';

(function () {
  var typeOfHousing = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  var WIDTH_PHOTO = 70;
  var HEIGHT_PHOTO = 50;

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

    arrPictures.forEach(function (it, i) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.src = arrPictures[i];
      img.style.width = WIDTH_PHOTO + 'px';
      img.style.height = HEIGHT_PHOTO + 'px';
      li.appendChild(img);
      popupPictures.appendChild(li);
    });

    return popupPictures;
  }

  function createCard(pinsDataArr, cardPopup) {
    var fragmentCard = document.createDocumentFragment();
    cardPopup.children[0].src = pinsDataArr.author.avatar;
    cardPopup.children[2].textContent = pinsDataArr.offer.title;
    cardPopup.children[3].children[0].textContent = pinsDataArr.offer.address;
    var popupPrice = cardPopup.querySelector('.popup__price');
    popupPrice.textContent = pinsDataArr.offer.price;
    popupPrice.innerHTML += '&#x20bd;/ночь';
    cardPopup.children[5].textContent = typeOfHousing[pinsDataArr.offer.type];
    cardPopup.children[6].textContent = pinsDataArr.offer.rooms + ' комнаты для ' + pinsDataArr.offer.guests + ' гостей';
    cardPopup.children[7].textContent = 'Заезд после ' + pinsDataArr.offer.checkin + ', выезд до ' + pinsDataArr.offer.checkout;
    creatfeatures(pinsDataArr, cardPopup);
    cardPopup.children[9].textContent = pinsDataArr.offer.description;
    creatFotos(cardPopup, pinsDataArr);
    fragmentCard.appendChild(cardPopup);
    return fragmentCard;
  }

  window.card = {
    createCard: createCard
  };
}
)();
