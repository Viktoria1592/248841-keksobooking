'use strict';

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