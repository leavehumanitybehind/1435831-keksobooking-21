/* eslint-disable object-shorthand */
"use strict";

(function () {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const cardPopup = cardTemplate.querySelectorAll(`.popup`);
  const cardElement = document.querySelector(`.map`);
  let activeCard = false;

  const onCardEscPress = function (evt) {
    window.util.isEscKeyCode(evt, disableCard);
  };

  const createCard = function (ad) {
    const card = cardTemplate.cloneNode(true);
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
      disableCard();
      window.pin.disablePin();
    });
    document.addEventListener(`keydown`, onCardEscPress);
    return card;
  };

  const disableCard = function () {
    if (activeCard) {
      cardElement.removeChild(activeCard);
      document.removeEventListener(`keydown`, onCardEscPress);
      window.pin.disablePin();
      activeCard = false;
    }
  };


  const renderCard = function (ad) {
    const ads = createCard(ad);
    cardElement.insertBefore(ads, cardElement.querySelector(`.map-filters__container`));
    activeCard = ads;
  };


  window.card = {
    cardTemplate: cardTemplate,
    createCard: createCard,
    cardPopup: cardPopup,
    renderCard: renderCard
  };

})();


