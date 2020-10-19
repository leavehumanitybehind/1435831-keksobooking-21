/* eslint-disable object-shorthand */
"use strict";


const onCardEscPress = function (evt) {
  window.util.isEscKeyCode(evt, function () {
    window.consts.pinsContainer.removeChild(window.consts.pinsContainer.querySelector(`.map__card`));
  });
};

const renderCard = function (ad) {
  const card = window.consts.cardTemplate.cloneNode(true);
  card.querySelector(`.popup__title`).textContent = ad.offer.title;
  card.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  card.querySelector(`.popup__text--price`).textContent = ad.offer.price;
  card.querySelector(`.popup__type`).textContent = ad.offer.type;
  card.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + ` ` + `выезд до ` + ad.offer.checkout;
  card.querySelector(`.popup__description`).textContent = ad.offer.description;
  card.querySelector(`.popup__avatar`).src = ad.author.avatar;
  card.querySelector(`.popup__photos`).innerHTML = window.data.getPhotos(ad.offer.photos);
  card.querySelector(`.popup__close`).addEventListener(`click`, function () {
    window.consts.pinsContainer.removeChild(window.consts.pinsContainer.querySelector(`.map__card`));
    window.pin.disablePin();
  });
  document.addEventListener(`keydown`, onCardEscPress);
  return card;
};

window.card = {
  renderCard: renderCard
};


