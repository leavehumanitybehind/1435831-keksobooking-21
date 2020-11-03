/* eslint-disable object-shorthand */
"use strict";

const pinTemplate = document.querySelector(`#pin`).content;
const mapPin = pinTemplate.querySelector(`.map__pin`);
const pinsContainer = document.querySelector(`.map__pins`);

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const renderPin = function (ad) {
  const pinsTemplate = mapPin.cloneNode(true);
  pinsTemplate.querySelector(`img`).src = ad.author.avatar;
  pinsTemplate.querySelector(`img`).alt = ad.offer.title;
  const pinX = ad.location.x - (PinSize.WIDTH / 2);
  const pinY = ad.location.y - PinSize.HEIGHT;
  pinsTemplate.style = `left:` + pinX + `px; top:` + pinY + `px;`;
  return pinsTemplate;
};

const removePins = function () {
  const allPins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  allPins.forEach(function (pin) {
    pinsContainer.removeChild(pin);
  });
};

const disablePin = function (pin) {
  const activePin = pinsContainer.querySelector(`.map__pin--active`);
  pin.classList.add(`map__pin--active`);
  if (activePin) {
    window.card.disable();
    activePin.classList.remove(`map__pin--active`);
  }
  pin.classList.remove(`map__pin--active`);
};


window.pin = {
  Size: PinSize,
  render: renderPin,
  remove: removePins,
  disable: disablePin
};

