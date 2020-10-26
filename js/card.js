/* eslint-disable object-shorthand */
"use strict";

const HOUSING_TYPES = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const pinsContainer = document.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const popup = pinsContainer.querySelector(`.map__card`);


const getFeautures = function (ad, card) {
  const features = card.querySelector(`.popup__features`);
  features.innerHTML = ``;
  const fragmentFeatures = document.createDocumentFragment();
  for (let i = 0; i < ad.offer.features.length; i++) {
    const newFeature = document.createElement(`li`);
    newFeature.classList.add(`popup__feature`);
    newFeature.classList.add(`popup__feature--` + ad.offer.features[i]);
    fragmentFeatures.appendChild(newFeature);
  }
  features.appendChild(fragmentFeatures);
};

const getPhotos = function (photos) {
  const imgs = [];
  for (let i = 0; i < photos.length; i++) {
    imgs.push(`<img src="` + photos[i] + `"class="popup__photo" width="45" height = "40" alt = "Photo">`);
  }
  return imgs;
};

const disableCard = function () {
  window.pin.disable();
  if (popup) {
    pinsContainer.removeChild(popup);
    popup.querySelector(`.map__card`).querySelector(`.popup__close`).removeEventListener(`click`, disableCard);
  }
};

const onCardEscPress = function (evt) {
  if (evt.code === window.util.KeyCode.ESCAPE) {
    disableCard();
  }
  document.removeEventListener(`keydown`, onCardEscPress);
};

const renderCard = function (ad) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector(`.popup__title`).textContent = ad.offer.title;
  card.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  card.querySelector(`.popup__text--price`).textContent = ad.offer.price;
  const type = card.querySelector(`.popup__type`);
  switch (ad.offer.type) {
    case `palace`:
      type.textContent = HOUSING_TYPES.palace;
      break;
    case `flat`:
      type.textContent = HOUSING_TYPES.flat;
      break;
    case `house`:
      type.textContent = HOUSING_TYPES.house;
      break;
    case `bungalow`:
      type.textContent = HOUSING_TYPES.bungalow;
      break;
  }
  card.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + ` ` + `выезд до ` + ad.offer.checkout;
  card.querySelector(`.popup__description`).textContent = ad.offer.description;
  card.querySelector(`.popup__avatar`).src = ad.author.avatar;
  card.querySelector(`.popup__photos`).innerHTML = getPhotos(ad.offer.photos);
  getFeautures(ad, card);

  card.querySelector(`.map__card`).querySelector(`.popup__close`).addEventListener(`click`, disableCard);
  document.addEventListener(`keydown`, onCardEscPress);
  return card;
};


window.card = {
  render: renderCard,
  disable: disableCard
};


