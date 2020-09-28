'use strict';
const MAP_WIDTH = 1200;
const MAP_TOP = 130;
const MAP_BOTTOM = 630;
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;
const AD_NUMBER = 8;
const TYPES_DWELLING = [`palace`, `flat`, `house`, `bungalow`];
const MIN_PRICE = 1000;
const MAX_PRICE = 1000000;
const ROOMS = [1, 2, 3];
const GUESTS = [1, 2, 3];
const HOURS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

let pinTemplate = document.querySelector(`#pin`).content;
let mapPin = pinTemplate.querySelector(`.map__pin`);
let pinElement = document.querySelector(`.map`).querySelector(`.map__pins`);
let cardTemplate = document.querySelector(`#card`).content;
let cardElement = document.querySelector(`.map`);


let getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

let getRandomValueFromArray = function (arr) {
  return arr[Math.floor(arr.length * Math.random())];
};

let generateFeautures = function () {
  let numberOfFeautures = getRandomNumber(1, FEATURES.length);
  let features = [];
  let feature = getRandomValueFromArray(FEATURES);
  for (let i = 0; i < numberOfFeautures; i++) {
    while (features.includes(feature)) {
      feature = getRandomValueFromArray(FEATURES);
    }
    features[i] = feature;
  }
  return features;
};

let createAdData = function (numberOfData) {
  let locationY = getRandomNumber(MAP_TOP, MAP_BOTTOM);
  let locationX = getRandomNumber(0, MAP_WIDTH);
  let adData = {
    author: {
      avatar: `img/avatars/user0` + (numberOfData + 1) + `.png`
    },
    offer: {
      title: `Заголовок`,
      address: locationX + `,` + locationY,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE) + ` р`,
      type: getRandomValueFromArray(TYPES_DWELLING),
      rooms: getRandomValueFromArray(ROOMS),
      guests: getRandomValueFromArray(GUESTS),
      checkin: getRandomValueFromArray(HOURS),
      checkout: getRandomValueFromArray(HOURS),
      features: generateFeautures(),
      description: `Строка с описанием`,
      photos: PHOTOS
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return adData;
};

let getListOfAd = function () {
  let ads = [];
  for (let i = 0; i < AD_NUMBER; i++) {
    ads[i] = createAdData(i);
  }
  return ads;
};

let createPinTemplate = function (adData) {
  let templatePin = mapPin.cloneNode(true);
  let pinX = adData.locationX - (PIN_WIDTH / 2);
  let pinY = adData.locationY - PIN_HEIGHT;
  templatePin.style.left = pinX + `px;`;
  templatePin.style.top = pinY + `px;`;
  templatePin.querySelector(`img`).src = adData.author.avatar;
  templatePin.querySelector(`img`).alt = adData.offer.title;

  return templatePin;
};

let renderMapPins = function (ads) {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < ads.length; i++) {
    fragment.appendChild(createPinTemplate(ads[i]));
  }
  pinElement.appendChild(fragment);
};


function generatePhotos(photos) {
  let imgTags = ``;
  for (let i = 0; i < photos.length; i++) {
    imgTags += `<img src="` + photos[i] + `"class="popup__photo" width="45" height = "40" alt = "Photo">`;
  }
  return imgTags;
}

let createAd = function (ad) {
  let card = cardTemplate.cloneNode(true);
  let title = card.querySelector(`.popup__title`);
  title.textContent = ad.offer.title;
  card.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  card.querySelector(`.popup__text--price`).textContent = ad.offer.price;
  card.querySelector(`.popup__type`).textContent = ad.offer.type;
  card.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + ` ` + `выезд до ` + ad.offer.checkout;
  card.querySelector(`.popup__description`).textContent = ad.offer.description;
  card.querySelector(`.popup__avatar`).src = ad.author.avatar;
  card.querySelector(`.popup__photos`).innerHTML = generatePhotos(ad.offer.photos);
  return card;
};

let renderCards = function () {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < ads.length; i++) {
    fragment.appendChild(createAd(ads[i]));
  }
  cardElement.insertBefore(fragment, cardElement.querySelector(`.map-filters__container`));
};

cardElement.classList.remove(`map--faded`);

let ads = getListOfAd();
renderMapPins(ads);
let card = createAd(ads[0]);
renderCards(card);


