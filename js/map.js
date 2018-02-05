'use strict';

function setarr () {

var domicileSpecification = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var domiciles = ['flat', 'house', 'bungalo'];
var checkinCheckout = ['12:00', '13:00', '14:00'];
var advantages = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
function getRandomFeatures(advantages) {
	var lengthRandom = Math.floor(Math.random()*advantages.length) + 1;
	var advantagesRandom = [];
	for (var j = 0; j < lengthRandom; j++) { 
		advantagesRandom[j] = advantages[Math.floor(Math.random()*advantages.length)];
		advantages.splice(advantages.indexOf(advantagesRandom[j]), 1);  
		
 };
  return advantagesRandom;
  console.log(advantagesRandom);
  };
function getRandomPhotos(a, b) {
  return Math.random() - 0.5;
};  

for (var i = 0; i < 8; i++) {
	var arr = [];
	arr[i] = {
  "author": {
    "avatar": 'img/avatars/user0' + i + '.png',
  },
  "offer": {
    "title": domicileSpecification[i],
    "address": "{{location.x}}, {{location.y}}",
    "price": 1000 + Math.floor(Math.random()*999000),
    "type": domiciles[Math.floor(Math.random()*domiciles.length)],
    "rooms": 1 + Math.floor(Math.random()*5),
    "guests": 1 + Math.floor(Math.random()*8),
    "checkin": checkinCheckout[Math.floor(Math.random()*checkinCheckout.length)],
    "checkout": checkinCheckout[Math.floor(Math.random()*checkinCheckout.length)],
    "features": getRandomFeatures(advantages),
    "description": '',
    "photos": photos.sort(getRandomPhotos)
},
  "location": {
    "x": 300 + Math.floor(Math.random()*600),
    "y": 150 + Math.floor(Math.random()*350)
  }
}
};
return arr;
};
console.log(setarr());
var map = document.querySelector('.map');
	map.classList.remove('.map--faded');

var pinAvatar = document.querySelector('.map_pin_avatar');
var fragmentPin = document.createDocumentFragment();
for (var i = 0; i < arr.length; i++) {
	var locationLeft = arr[i].location.x + 20 + 'px';
	pinAvatar.style.left='locationLeft';
	pinAvatar.style.top='arr[i].location.y + 44';
	pinAvatar.children[0].src='arr[i].author.avatar'
	
	fragmentPin.appendChild(pinAvatar);
	console.log(fragmentPin);
}
