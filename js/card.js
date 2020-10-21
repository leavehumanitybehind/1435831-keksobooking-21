/* eslint-disable object-shorthand */
"use strict";

const pinsContainer = document.querySelector(`.map__pins`);

const HOUSING_TYPES = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const onCardEscPress = function (evt) {
  window.util.isEscKeyCode(evt, function () {
    pinsContainer.removeChild(pinsContainer.querySelector(`.map__card`));
  });
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
  card.querySelector(`.popup__photos`).innerHTML = window.data.getPhotos(ad.offer.photos);
  window.data.getFeautures(ad, card);
  card.querySelector(`.popup__close`).addEventListener(`click`, function () {
    pinsContainer.removeChild(pinsContainer.querySelector(`.map__card`));
    window.pin.disable();
  });
  document.addEventListener(`keydown`, onCardEscPress);
  return card;
};

window.card = {
  render: renderCard
};


